let listaDeContas = [];

const adicionarQrCode = () => {
  let nomeConta = document.getElementById("conta").value;
  let categoriaConta = document.getElementById("categoria").value;
  let valorConta = document.getElementById("valor").value;

  let verificarCadastro = nomeConta && categoriaConta && valorConta;
  let mensagemEnvio = document.getElementById("mensagemEnvio");

  if (verificarCadastro) {
    listaDeContas.push({ nomeConta, categoriaConta, valorConta });
    // console.log(listaDeContas);

    mensagemEnvio.innerHTML = "<span>Conta adicionada com sucesso!</span>";
  } else {
    mensagemEnvio.innerHTML =
      "<span>Todos os campos precisam ser preenchidos.</span>";
  }
};
