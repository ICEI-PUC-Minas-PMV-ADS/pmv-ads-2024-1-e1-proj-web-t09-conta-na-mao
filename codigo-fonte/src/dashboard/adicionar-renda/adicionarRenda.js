let listaDeContas = [];

const adicionarRenda = () => {
  let nomeRenda = document.getElementById("renda").value;
  let categoriaRenda = document.getElementById("categoria").value;
  let valorRenda = document.getElementById("valor").value;

  let verificarCadastro = nomeRenda && categoriaRenda && valorRenda;
  let mensagemEnvio = document.getElementById("mensagemEnvio");

  if (verificarCadastro) {
    valorRenda = parseFloat(valorRenda.replace("R$ ", "").replace(",", "."));
    listaDeContas.push({ nomeRenda, categoriaRenda, valorRenda });

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
      let valor = parseFloat(input.value.replace("R$ ", ""));
      input.value = "R$ " + valor.toFixed(2).replace(".", ",");
    }
  });
};

tratarValorInput();
