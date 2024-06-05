// ABRIR MENU

const abrirMenu = () => {
  const menuLateral = document.querySelector(".menu-lateral");
  const menuIcone = document.querySelector(".icon-menu-principal");

  if (menuLateral.classList.contains("menu-aberto")) {
    menuLateral.classList.remove("menu-aberto");
    menuLateral.classList.add("menu-fechado");
    menuIcone.style.display = "block";
  } else {
    menuLateral.classList.remove("menu-fechado");
    menuLateral.classList.add("menu-aberto");
    menuIcone.style.display = "none";
  }
};

// PEGAR DADOS DO CLIENTE

const getDadosDoCliente = () => {
  fetch("http://localhost:3000/usuarios")
    .then((resposta) => resposta.json())
    .then((usuario) => {
      const usuarioLocal = localStorage.getItem("usuarioLogado");
      const usuarioJSON = JSON.parse(usuarioLocal);
      const idDoUsuario = usuarioJSON.id;
      const usuarioBanco = usuario[0].id;
      if (idDoUsuario === usuarioBanco) gerarDados(usuario[0]);
    })
    .catch((erro) => console.error("Erro: ", erro));
};

// FORMATAR DADOS

const formatarCpf = (cpf) => {
  const cpfFormatado = cpf.replace(
    /(\d{3})(\d{3})(\d{3})(\d{2})/,
    "$1.$2.$3-$4"
  );

  return cpfFormatado;
};

const formatarContato = (contato) => {
  const contatoFormatado = contato.replace(
    /(\d{2})(\d{5})(\d{4})/,
    "($1) $2-$3"
  );

  return contatoFormatado;
};

const formatarData = (data) => {
  const dataFormatada = new Date(data);
  const dia = dataFormatada.getDate().toString().padStart(2, "0");
  const mes = (dataFormatada.getMonth() + 1).toString().padStart(2, "0");
  const ano = dataFormatada.getFullYear().toString();

  return `${dia}/${mes}/${ano}`;
};

const gerarDados = (usuario) => {
  const usuarioNome = document.querySelector(".usuario-nome span");
  const usuarioDados = document.querySelector(".usuario-dados");

  usuarioNome.innerHTML = `${usuario.nome} ${usuario.sobrenome}`;

  usuarioDados.innerHTML = `
  <p>Email: <span>${usuario.email}</span></p>
  <p>CPF: <span>${formatarCpf(usuario.cpf)}</span></p>
  <p>Contato: <span>${formatarContato(usuario.telefone)}</span></p>
  <p>Nascimento: <span>${formatarData(usuario.dataNascimento)}</span></p>
  `;
};

const gerarMensagemErroEmTela = () => {
  const usuarioNome = document.querySelector(".usuario-nome span");
  const usuarioDados = document.querySelector(".usuario-dados");
  const usuarioBotoes = document.querySelector(".usario-botoes");

  usuarioNome.innerHTML = `<p>Erro</p>`;
  usuarioDados.innerHTML = `<p>Usuário não encontrado, faça o login.</p>`;
  usuarioBotoes.innerHTML = `<button class="botao-secundario" onclick="window.location.href = '../../index.html'">Voltar a página principal</button>`;
};

getDadosDoCliente();

// PEGAS DADOS DO CLIENTE NO LOCAL STORAGE

const dadosDoClienteLocal = () => {
  const usuario = localStorage.getItem("usuarioLogado");
  const usuarioJSON = JSON.parse(usuario);

  if (!usuarioJSON) gerarMensagemErroEmTela();

  gerarDados(usuarioJSON);
};

dadosDoClienteLocal();

// MUDAR SENHA

const mudarSenha = () => {
  alert("Essa opção está indisponível no momento.");
};

// EXCLUIR USUÁRIO

const excluirUsuario = () => {
  const usuario = localStorage.getItem("usuarioLogado");
  const usuarioJSON = JSON.parse(usuario);
  const idDoUsuario = usuarioJSON.id;

  if (idDoUsuario) {
    excluirUsuarioDoBanco(idDoUsuario);

    localStorage.removeItem("usuarioLogado");
    window.location.href = "../../index.html";
  }
};

const excluirUsuarioDoBanco = (id) => {
  fetch(`http://localhost:3000/usuarios?id=${id}`, {
    method: "DELETE",
  })
    .then(console.log("Usuário excluído."))
    .catch((erro) => console.error("Erro: ", erro));
};
