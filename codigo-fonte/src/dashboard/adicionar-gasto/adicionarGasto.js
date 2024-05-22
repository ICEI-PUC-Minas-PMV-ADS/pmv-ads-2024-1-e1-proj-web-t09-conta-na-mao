let listaDeContas = [];

const adicionarGasto = () => {
  let nomeGasto = document.getElementById("gasto").value;
  let categoriaGasto = document.getElementById("categoria").value;
  let valorGasto = document.getElementById("valor").value;

  let verificarCadastro = nomeGasto && categoriaGasto && valorGasto;
  let mensagemEnvio = document.getElementById("mensagemEnvio");

  if (verificarCadastro) {
    listaDeContas.push({ nomeGasto, categoriaGasto, valorGasto });
    // console.log(listaDeContas);

    mensagemEnvio.innerHTML = "<span>Conta adicionada com sucesso!</span>";
  } else {
    mensagemEnvio.innerHTML =
      "<span>Todos os campos precisam ser preenchidos.</span>";
  }
};
