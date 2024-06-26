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

// PEGAR DADOS NO BANCO DE DADOS

let listaDeTipos = [];

const getListaDeGastos = () => {
  fetch("http://localhost:3000/listaDeGastos")
    .then((resposta) => resposta.json())
    .then((lista) => {
      lista.forEach((item) => listaDeTipos.push(item.tipo));
      gerarCategorias(listaDeTipos);
    })
    .catch((erro) => console.error("Erro: ", erro));
};

const gerarListaDeCategorias = (categoria) => {
  const listaDeCategoriasLocal = localStorage.getItem("listaDeCategorias");
  const listaDeCategorias = JSON.parse(listaDeCategoriasLocal) || [];

  listaDeTipos.push(categoria);
  listaDeCategorias.push(categoria);
  localStorage.setItem("listaDeCategorias", JSON.stringify(listaDeCategorias));
};

const gerarTagDeCategoriasLocal = () => {
  const variavelDiv = document.querySelector(".variavel");

  const listaDeGastosLocal = localStorage.getItem("listaDeGastos");
  const listaDeGastos = JSON.parse(listaDeGastosLocal).gastos;

  listaDeGastos.forEach((gasto) => {
    const itemCategoria = document.createElement("div");
    itemCategoria.classList.add("item-categoria", "padrao", gasto.tipo);
    itemCategoria.textContent =
      gasto.tipo.charAt(0).toUpperCase() + gasto.tipo.slice(1);
    variavelDiv.appendChild(itemCategoria);

    listaDeTipos.push(gasto.tipo);
  });

  const listaDeCategoriasLocal = localStorage.getItem("listaDeCategorias");
  const listaDeCategorias = JSON.parse(listaDeCategoriasLocal) || [];

  listaDeCategorias.forEach((item) => {
    if (!listaDeTipos.includes(item)) {
      listaDeTipos.push(item);
      const itemCategoria = document.createElement("div");
      itemCategoria.classList.add("item-categoria", "padrao", item);
      itemCategoria.textContent = item.charAt(0).toUpperCase() + item.slice(1);
      variavelDiv.appendChild(itemCategoria);
    }
  });

  localStorage.setItem("listaDeCategorias", JSON.stringify(listaDeTipos));
};

gerarTagDeCategoriasLocal();

const gerarCategorias = (lista) => {
  const variavelDiv = document.querySelector(".variavel");
  variavelDiv.innerHTML = "";
  const categoriasAdicionadas = [];

  lista.forEach((item) => {
    if (!categoriasAdicionadas.includes(item)) {
      categoriasAdicionadas.push(item);

      const itemCategoria = document.createElement("div");
      itemCategoria.classList.add("item-categoria", "padrao", item);
      itemCategoria.textContent = item.charAt(0).toUpperCase() + item.slice(1);
      variavelDiv.appendChild(itemCategoria);
    }
  });
};

getListaDeGastos();

// FILTRO

const semResultado = document.querySelector(".sem-resultado");

const filtrarCategoria = (categoria) => {
  const itemCategoria = document.querySelectorAll(".item-categoria");
  let categoriaEncontrada = false;

  if (
    categoria === "" ||
    categoria.toLowerCase() === "todos" ||
    categoria.toLowerCase() === "todas"
  ) {
    itemCategoria.forEach((variavel) => {
      variavel.style.display = "flex";
    });
    return true;
  }

  itemCategoria.forEach((variavel) => {
    const itemCategoriaConteudo = variavel.textContent.toLowerCase();

    if (categoria.toLowerCase() === itemCategoriaConteudo) {
      variavel.style.display = "flex";
      categoriaEncontrada = true;
    } else {
      variavel.style.display = "none";
    }
  });

  return categoriaEncontrada;
};

const exibirMensagemErro = (categoria) => {
  semResultado.style.display = "block";
  semResultado.innerText = `Não há itens para a categoria ${categoria}`;
};

const verificarCategoria = (event) => {
  event.preventDefault();
  const filtro = document.querySelector(".input-filtro");
  const categoria = filtro.value.trim();
  const categoriaEncontrada = filtrarCategoria(categoria);

  if (!categoriaEncontrada) {
    exibirMensagemErro(categoria);
  } else {
    semResultado.style.display = "none";
  }
};

// ADICIONAR CATEGORIA

const adicionarCategoria = () => {
  event.preventDefault();
  const categoriaInput = document.querySelector(".input-adicionar").value;
  if (!listaDeTipos.includes(categoriaInput)) {
    listaDeTipos.push(categoriaInput);
    gerarCategorias(listaDeTipos);
    gerarListaDeCategorias(categoriaInput);
  }
};

// REMOVER CATEGORIA

const removerCategoria = () => {
  event.preventDefault();
  const categoriaInput = document.querySelector(".input-remover").value;
  const index = listaDeTipos.indexOf(categoriaInput);
  if (index > -1) {
    listaDeTipos.splice(index, 1);
    gerarCategorias(listaDeTipos);
    removerCategoriaLocal(categoriaInput);
  }
};

const removerCategoriaLocal = (categoriaInput) => {
  const listaDeCategoriasLocal = localStorage.getItem("listaDeCategorias");
  const listaDeCategorias = JSON.parse(listaDeCategoriasLocal);

  const index = listaDeCategorias.indexOf(categoriaInput);
  if (index > -1) {
    listaDeCategorias.splice(index, 1);
    localStorage.setItem(
      "listaDeCategorias",
      JSON.stringify(listaDeCategorias)
    );
  }

  const categoriaDiv = document.querySelector(`.${categoriaInput}`);
  if (categoriaDiv) categoriaDiv.remove();
};
