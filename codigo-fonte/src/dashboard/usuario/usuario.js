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

const gerarDados = (usuario) => {
  const usuarioNome = document.querySelector(".usuario-nome span");
  const usuarioDados = document.querySelector(".usuario-dados");

  usuarioNome.innerHTML = `${usuario.nome}`;

  usuarioDados.innerHTML = `
    <p>Email: <span>${usuario.email}</span></p>
    <p>CPF: <span>${usuario.cpf}</span></p>
    <p>Contato: <span>${usuario.contato}</span></p>
    <p>Nascimento: <span>${usuario.dataNascimento}</span></p>
  `;
};

getDadosDoCliente();

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
