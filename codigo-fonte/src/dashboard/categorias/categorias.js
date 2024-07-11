let listaDeTipos = [];
const listaDeCategoriasLocal = localStorage.getItem("listaDeCategorias");
const listaDeCategorias = JSON.parse(listaDeCategoriasLocal) || [];

const getListaDeGastos = () => {
  fetch("http://localhost:3000/listaDeGastos")
    .then((resposta) => resposta.json())
    .then((lista) => {
      lista.forEach((item) => listaDeTipos.push(item.tipo));
      gerarCategorias(listaDeTipos);
    })
    .catch((erro) => console.error("Erro ao accesar JSON Server", erro));
};

const gerarListaDeCategorias = (categoria) => {
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
  const mostrarTodasCategorias =
    categoria === "" ||
    categoria.toLowerCase() === "todos" ||
    categoria.toLowerCase() === "todas";

  if (mostrarTodasCategorias) {
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

  filtro.value = "";
};

// ADICIONAR CATEGORIA

const adicionarCategoria = () => {
  event.preventDefault();
  const categoriaInput = document.querySelector(".input-adicionar");
  const categoriaValor = categoriaInput.value;

  if (!listaDeTipos.includes(categoriaValor)) {
    listaDeTipos.push(categoriaValor);
    gerarCategorias(listaDeTipos);
    gerarListaDeCategorias(categoriaValor);
  }
  categoriaInput.value = "";
};

// REMOVER CATEGORIA

const removerCategoria = () => {
  event.preventDefault();
  const categoriaInput = document.querySelector(".input-remover");
  const categoriaValor = categoriaInput.value;
  const index = listaDeTipos.indexOf(categoriaValor);

  if (index > -1) {
    listaDeTipos.splice(index, 1);
    gerarCategorias(listaDeTipos);
    removerCategoriaLocal(categoriaValor);
  }
  categoriaInput.value = "";
};

const removerCategoriaLocal = (categoriaInput) => {
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
