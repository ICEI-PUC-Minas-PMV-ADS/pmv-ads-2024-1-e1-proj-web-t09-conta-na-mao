let listaDeContas = [];

const adicionarGasto = () => {
  let nomeGasto = document.getElementById("gasto").value;
  let categoriaGasto = document.getElementById("categoria").value;
  let valorGasto = document.getElementById("valor").value;
  let tipo = categoriaGasto.toLowerCase().replace(" ", "-");

  let verificarCadastro = nomeGasto && categoriaGasto && valorGasto;
  let mensagemEnvio = document.getElementById("mensagemEnvio");

  if (verificarCadastro) {
    let novoGasto = {
      nomeGasto,
      categoriaGasto,
      valorGasto,
      tipo,
    };
    listaDeContas.push(novoGasto);
    adicionarListaDeGastos(novoGasto);

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
