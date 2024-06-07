// ACESSO RESTRITO

const verificarContaLogada = () => {
  const usuarioLogado = localStorage.getItem("usuarioLogado");
  if (!usuarioLogado || usuarioLogado === "{}") {
    alert(
      "Acesso restrito! Você precisa estar logado para acessar essa página!"
    );
    window.location.href = "../../login/login.html";
  }
};

verificarContaLogada();

const adicionarRenda = () => {
  let nomeRenda = document.getElementById("renda").value;
  let categoriaRenda = document.getElementById("categoria").value;
  let valorRenda = document.getElementById("valor").value;
  let tipo = categoriaRenda.toLowerCase().replace(" ", "-");

  let verificarCadastro = nomeRenda && categoriaRenda && valorRenda;
  let mensagemEnvio = document.getElementById("mensagemEnvio");

  if (verificarCadastro) {
    valorRenda = parseFloat(valorRenda.replace("R$ ", "").replace(",", "."));

    let novaRenda = {
      nomeRenda,
      categoriaRenda,
      valorRenda,
      tipo,
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
      let valor = parseFloat(input.value.replace("R$ ", ""));
      input.value = "R$ " + valor.toFixed(2).replace(".", ",");
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
    .catch((erro) => console.error("Erro: ", erro));
};

tratarValorInput();

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
