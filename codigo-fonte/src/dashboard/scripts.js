// ACESSO RESTRITO

const verificarContaLogada = () => {
  const usuarioLogado = localStorage.getItem("usuarioLogado");
  if (!usuarioLogado || usuarioLogado === "{}") {
    alert(
      "Acesso restrito! Você precisa estar logado para acessar essa página!"
    );
    window.location.href = "../login/login.html";
  }
};

verificarContaLogada();

// MENU

const menuLateral = document.querySelector(".menu-lateral");
const menuIcone = document.querySelector(".icon-menu-principal");

const abrirMenu = () => {
  if (menuLateral.classList.contains("menu-aberto")) {
    menuLateral.classList.remove("menu-aberto");
    menuLateral.classList.add("menu-fechado");
    menuIcone.style.display = "block";
  } else {
    fecharMenu();
  }
};

const fecharMenu = () => {
  menuLateral.classList.remove("menu-fechado");
  menuLateral.classList.add("menu-aberto");
  menuIcone.style.display = "none";
};

// FORMATAR DADOS

const formatarValor = (valor) => {
  return `R$ ${parseFloat(valor).toFixed(2).replace(".", ",")}`;
};

const formatarValorParaJSON = (valor) => {
  return parseFloat(valor.replace("R$ ", "").replace(",", "."));
};

const formatarValorNegativoParaJSON = (valor) => {
  return parseFloat(valor.replace("- R$ ", "").replace(",", "."));
};
