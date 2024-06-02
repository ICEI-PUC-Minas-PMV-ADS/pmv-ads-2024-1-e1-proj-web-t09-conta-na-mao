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
