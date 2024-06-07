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

// LOGAR

const isJSONServerAvailable = async () => {
  try {
    const response = await fetch("http://localhost:3000");
    return response.ok;
  } catch (error) {
    console.error("JSON Server desconectado", error);
    return false;
  }
};

const usarJSONServer = async () => {
  const jsonServerDisponivel = await isJSONServerAvailable();
  if (jsonServerDisponivel) logarUsuario();
  else logarUsuarioLocal();
};

const logarUsuario = () => {
  const email = document.getElementById("email").value;
  const senha = document.getElementById("senha").value;

  fetch("http://localhost:3000/usuarios")
    .then((resposta) => resposta.json())
    .then((dados) => {
      const usuario = dados.find(
        (usuario) => usuario.email === email && usuario.senha === senha
      );

      if (usuario) {
        localStorage.setItem("usuarioLogado", JSON.stringify(usuario));
        window.location.href = "../dashboard/dashboard.html";
      } else {
        alert("Usuário ou senha inválida, tente novamente.");
      }
    })
    .catch((erro) => console.error("Erro: ", erro));
};

const logarUsuarioLocal = () => {
  const email = document.querySelector("#email").value;
  const senha = document.querySelector("#senha").value;
  const usuarios = JSON.parse(localStorage.getItem("usuarioLogado"));
  const verificarUsuario = usuarios.email === email && usuarios.senha === senha;

  if (verificarUsuario) window.location.href = "../dashboard/dashboard.html";
  else alert("Usuário ou senha inválida, tente novamente.");
};

//Vaçidação

function entrar() {
  let usuario = document.querySelector("#usuario");
  let userLabel = document.querySelector("#userLabel");

  let senha = document.querySelector("#senha");
  let senhaLabel = document.querySelector("#senhaLabel");

  let msgError = document.querySelector("#msgError");
  let listaUser = [];

  let userValid = {
    nome: "",
    user: "",
    senha: "",
  };

  listaUser = JSON.parse(localStorage.getItem("listaUser"));

  listaUser.forEach((item) => {
    if (usuario.value == item.userCad && senha.value == item.senhaCad) {
      userValid = {
        nome: item.nomeCad,
        user: item.userCad,
        senha: item.senhaCad,
      };
    }
  });

  if (usuario.value == userValid.user && senha.value == userValid.senha) {
    window.location.href = "../../index.html";

    let mathRandom = Math.random().toString(16).substr(2);
    let token = mathRandom + mathRandom;

    localStorage.setItem("token", token);
    localStorage.setItem("userLogado", JSON.stringify(userValid));
  } else {
    userLabel.setAttribute("style", "color: red");
    usuario.setAttribute("style", "border-color: red");
    senhaLabel.setAttribute("style", "color: red");
    senha.setAttribute("style", "border-color: red");
    msgError.setAttribute("style", "display: block");
    msgError.innerHTML = "Usuário ou senha incorretos";
    usuario.focus();
  }
}
