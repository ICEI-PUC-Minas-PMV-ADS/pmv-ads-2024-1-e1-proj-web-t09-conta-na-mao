const adicionarRenda = () => {
  let nomeRenda = document.getElementById("renda").value;
  let categoriaRenda = document.getElementById("categoria").value;
  let valorRenda = document.getElementById("valor").value;
  let tipo = categoriaRenda.toLowerCase().replace(" ", "-");

  let verificarCadastro = nomeRenda && categoriaRenda && valorRenda;
  let mensagemEnvio = document.getElementById("mensagemEnvio");

  if (verificarCadastro) {
    valorRenda = formatarValorParaJSON(valorRenda);

    let novaRenda = {
      nomeRenda,
      categoriaRenda,
      valorRenda,
      tipo,
      data: new Date().toLocaleDateString(),
    };
    postRenda(novaRenda);
    adicionarListaDeRendas(novaRenda);

    mensagemEnvio.innerHTML = "<span>Renda adicionada com sucesso!</span>";
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
      input.value = formatarValor(input.value);
    }
  });
};

const adicionarListaDeRendas = (novaRenda) => {
  const listaDeRendasLocalStorage = localStorage.getItem("listaDeRendas");
  const listaDeRendas = JSON.parse(listaDeRendasLocalStorage) || { rendas: [] };

  listaDeRendas.rendas.push(novaRenda);
  localStorage.setItem("listaDeRendas", JSON.stringify(listaDeRendas));
};

const postRenda = (novaRenda) => {
  fetch("http://localhost:3000/listaDeRendas", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(novaRenda),
  })
    .then((resposta) => resposta.json())
    .then((novaRenda) => {
      adicionarListaDeRendas(novaRenda);
    })
    .catch((erro) => console.error("Erro ao enviar para JSON Server", erro));
};

tratarValorInput();
