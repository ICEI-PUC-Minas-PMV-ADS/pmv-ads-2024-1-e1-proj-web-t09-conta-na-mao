const adicionarQrCode = () => {
  let nomeConta = document.getElementById("conta").value;
  let categoriaConta = document.getElementById("categoria").value;
  let valorConta = document.getElementById("valor").value;
  let tipo = categoriaConta.toLowerCase().replace(" ", "-");

  let verificarCadastro = nomeConta && categoriaConta && valorConta;
  let mensagemEnvio = document.getElementById("mensagemEnvio");

  if (verificarCadastro) {
    valorConta = parseFloat(valorConta.replace("R$ ", "").replace(",", "."));

    let novoGasto = {
      nomeConta,
      categoriaConta,
      valorConta,
      tipo,
    };
    postQrCode(novoGasto);

    mensagemEnvio.innerHTML = "<span>Conta adicionada com sucesso!</span>";
  } else {
    mensagemEnvio.innerHTML =
      "<span>Todos os campos precisam ser preenchidos.</span>";
  }
};

const tratarValorInput = () => {
  let input = document.getElementById("valor");

  input.addEventListener("focus", () => {
    if (input.value === "" || input.value === "R$ ") {
      input.value = "R$ ";
    } else {
      let valor = parseFloat(input.value.replace("R$ ", ""));
      input.value = "R$ " + valor.toFixed(2).replace(".", ",");
    }
  });
};

const adicionarListaDeGastos = (novoGasto) => {
  const listaDeGastosLocalStorage = localStorage.getItem("listaDeGastos");
  const listaDeGastos = JSON.parse(listaDeGastosLocalStorage);

  listaDeGastos.gastos.push(novoGasto);
  localStorage.setItem("listaDeGastos", JSON.stringify(listaDeGastos));
};

const postQrCode = (novoGasto) => {
  fetch("http://localhost:3000/listaDeGastos", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(novoGasto),
  })
    .then((resposta) => resposta.json())
    .then((novoGasto) => {
      adicionarListaDeGastos(novoGasto);
    })
    .catch((erro) => console.error("Erro: ", erro));
};

tratarValorInput();
