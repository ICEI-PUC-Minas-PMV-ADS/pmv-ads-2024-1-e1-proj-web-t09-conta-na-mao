// PEGAR DADOS NO BANCO DE DADOS

const getListaDeGastos = () => {
  fetch("http://localhost:3000/listaDeGastos")
    .then((resposta) => resposta.json())
    .then((gasto) => {
      gerarItensDeGastos(gasto);
    })
    .catch((erro) => console.error("Erro ao acessar JSON Server", erro));
};

const gerarItensDeGastos = (gasto) => {
  let listaVariaveis = document.getElementsByClassName("itens-variaveis")[0];
  gasto.forEach((conta) => {
    listaVariaveis.innerHTML += `
      <div class="variavel">
      <div class="itens-categorias">
      <img src="../imagens/arrow-down.svg" alt="Seta para baixo" />
      <span class="item-nome">${conta.nomeGasto}</span>
      <span class="item-categoria padrao ${conta.tipo}">${
      conta.categoriaGasto
    }</span>
      </div>
      <span class="item-valor gasto-valor">- ${formatarValor(conta.valorGasto)}
      </span>
      </div>
      `;
  });
};

getListaDeGastos();

// PEGAR DADOS NO LOCALSTORAGE

const listaDeGastosLocal = () => {
  const listaDeGastosLocal = localStorage.getItem("listaDeGastos");
  const listaDeGastos = JSON.parse(listaDeGastosLocal) || { gastos: [] };

  gerarItensDeGastos(listaDeGastos.gastos);
};

listaDeGastosLocal();

// FILTRO

const filtrarCategoriaBotao = document.querySelector("#filtrarCategoria");
const filtro = document.querySelector(".filtro");
const semResultado = document.querySelector(".sem-resultado");

const filtrarCategoria = (categoria) => {
  const variaveis = document.querySelectorAll(".variavel");
  let categoriaEncontrada = false;
  const mostrarTodasCategorias =
    categoria === "" ||
    categoria.toLowerCase() === "todos" ||
    categoria.toLowerCase() === "todas";

  if (mostrarTodasCategorias) {
    variaveis.forEach((variavel) => {
      variavel.style.display = "flex";
    });
    return true;
  }

  variaveis.forEach((variavel) => {
    const itemCategoria = variavel.querySelector(".item-categoria").textContent;

    if (categoria === itemCategoria) {
      variavel.style.display = "flex";
      categoriaEncontrada = true;
    } else {
      variavel.style.display = "none";
    }
  });

  filtro.value = "";
  return categoriaEncontrada;
};

const exibirMensagemErro = (categoria) => {
  semResultado.style.display = "block";
  semResultado.innerText = `Não há itens para a categoria ${categoria}`;

  categoriaEncontrada = false;
};

const verificarCategoria = (event) => {
  event.preventDefault();
  const categoria = filtro.value.trim();
  const categoriaEncontrada = filtrarCategoria(categoria);

  if (!categoriaEncontrada) {
    exibirMensagemErro(categoria);
  } else {
    semResultado.style.display = "none";
  }
};

filtrarCategoriaBotao.addEventListener("click", verificarCategoria);
