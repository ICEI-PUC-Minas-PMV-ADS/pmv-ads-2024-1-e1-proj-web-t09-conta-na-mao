// PEGAR DADOS NO BANCO DE DADOS

const getListaDeRendas = () => {
  fetch("http://localhost:3000/listaDeRendas")
    .then((resposta) => resposta.json())
    .then((renda) => {
      gerarItensDeRendas(renda);
      atualizarRendaTotal();
      atualizarSaldoTotal();
    })
    .catch((erro) => console.error("Erro: ", erro));
};

const getListaDeGastos = () => {
  fetch("http://localhost:3000/listaDeGastos")
    .then((resposta) => resposta.json())
    .then((gasto) => {
      gerarItensDeGastos(gasto);
      atualizarGastoTotal();
      atualizarSaldoTotal();
    })
    .catch((erro) => console.error("Erro: ", erro));
};

const getListaDeInvestimentos = () => {
  fetch("http://localhost:3000/listaDeInvestimentos")
    .then((resposta) => resposta.json())
    .then((investimento) => {
      gerarItensDeInvestimentos(investimento);
      atualizarInvestimentoTotal();
      atualizarSaldoTotal();
    })
    .catch((erro) => console.error("Erro: ", erro));
};

const gerarItensDeRendas = (renda) => {
  let listaVariaveis = document.getElementsByClassName("itens-variaveis")[0];

  renda.forEach((conta) => {
    listaVariaveis.innerHTML += `
      <div class="variavel">
        <div class="itens-categorias">
          <img src="./imagens/arrow-up.svg" alt="Seta para cima" />
          <span class="item-nome">${conta.nomeRenda}</span>
          <span class="item-categoria ${conta.tipo}">${
      conta.categoriaRenda
    }</span>
        </div>
        <span class="item-valor renda-valor">R$ ${parseFloat(conta.valorRenda)
          .toFixed(2)
          .replace(".", ",")}</span>
      </div>
    `;
  });
};

const gerarItensDeGastos = (gasto) => {
  let listaVariaveis = document.getElementsByClassName("itens-variaveis")[0];
  gasto.forEach((conta) => {
    listaVariaveis.innerHTML += `
      <div class="variavel">
        <div class="itens-categorias">
          <img src="./imagens/arrow-down.svg" alt="Seta para baixo" />
          <span class="item-nome">${conta.nomeGasto}</span>
          <span class="item-categoria ${conta.tipo}">${
      conta.categoriaGasto
    }</span>
        </div>
          <span class="item-valor gasto-valor">- R$ ${parseFloat(
            conta.valorGasto
          )
            .toFixed(2)
            .replace(".", ",")}
          </span>
      </div>
    `;
  });
};

const gerarItensDeInvestimentos = (investimento) => {
  let listaVariaveis = document.getElementsByClassName("itens-variaveis")[0];
  investimento.forEach((conta) => {
    listaVariaveis.innerHTML += `
      <div class="variavel">
        <div class="itens-categorias">
          <img src="./imagens/arrow-down.svg" alt="Seta para baixo" />
          <span class="item-nome">${conta.nomeInvestimento}</span>
          <span class="item-categoria ${conta.tipo}">${
      conta.categoriaInvestimento
    }</span>
        </div>
          <span class="item-valor gasto-valor">- R$ ${parseFloat(
            conta.valorInvestimento
          )
            .toFixed(2)
            .replace(".", ",")}
          </span>
      </div>
    `;
  });
};

const atualizarRendaTotal = () => {
  let saldoRendas = 0;
  let valoresRenda = document.querySelectorAll(".renda-valor");
  let totalRenda = document.querySelector("#rendas h4");

  valoresRenda.forEach((valorRenda) => {
    valorRenda = parseFloat(
      valorRenda.textContent.replace("R$ ", "").replace(",", ".")
    );
    saldoRendas += valorRenda;
  });

  totalRenda.textContent = `R$ ${saldoRendas.toFixed(2).replace(".", ",")}`;

  return saldoRendas;
};

const atualizarGastoTotal = () => {
  let saldoGastos = 0;
  let valoresGasto = document.querySelectorAll(".gasto-valor");
  let totalGasto = document.querySelector("#gastos h4");

  valoresGasto.forEach((valorGasto) => {
    valorGasto = parseFloat(
      valorGasto.textContent.replace("- R$ ", "").replace(",", ".")
    );
    saldoGastos += valorGasto;
  });

  totalGasto.textContent = `R$ ${saldoGastos.toFixed(2).replace(".", ",")}`;

  return saldoGastos;
};

const atualizarInvestimentoTotal = () => {
  let saldoInvestimentos = 0;
  let valoresInvestimento = document.querySelectorAll(".investimento-valor");
  let totalInvestimento = document.querySelector("#investimentos h4");

  valoresInvestimento.forEach((valorInvestimento) => {
    valorInvestimento = parseFloat(
      valorInvestimento.textContent.replace("- R$ ", "").replace(",", ".")
    );
    saldoInvestimentos += valorInvestimento;
  });

  totalInvestimento.textContent = `R$ ${saldoInvestimentos
    .toFixed(2)
    .replace(".", ",")}`;

  return saldoInvestimentos;
};

const atualizarSaldoTotal = () => {
  let totalRendas = atualizarRendaTotal();
  let totalGastos = atualizarGastoTotal();
  let totalInvestimentos = atualizarInvestimentoTotal();
  let total = document.querySelector("#total h4");
  let saldoTotal = totalRendas - (totalGastos + totalInvestimentos);

  total.innerText = `R$ ${saldoTotal.toFixed(2).replace(".", ",")}`;

  if (saldoTotal > 0) {
    total.classList.add("disponivel");
    total.classList.remove("indisponivel");
  } else {
    total.classList.add("indisponivel");
    total.classList.remove("disponivel");
  }
};

getListaDeRendas();
getListaDeGastos();
getListaDeInvestimentos();

// PEGAR DADOS NO LOCAL STORAGE

// const criarListasNoLocalStorage = () => {
//   const usuarioLocalStorage = localStorage.getItem("usuarioLogado");
//   const usuario = JSON.parse(usuarioLocalStorage);

//   const listaDeGastos = {
//     email: usuario.email,
//     gastos: [],
//   };
//   localStorage.setItem("listaDeGastos", JSON.stringify(listaDeGastos));

//   const listaDeRendas = {
//     email: usuario.email,
//     rendas: [],
//   };
//   localStorage.setItem("listaDeRendas", JSON.stringify(listaDeRendas));

//   const listaDeInvestimentos = {
//     email: usuario.email,
//     investimentos: [],
//   };
//   localStorage.setItem(
//     "listaDeInvestimentos",
//     JSON.stringify(listaDeInvestimentos)
//   );
// };

// criarListasNoLocalStorage();

// FILTRO

const filtrarCategoriaBotao = document.querySelector("#filtrarCategoria");
const filtro = document.querySelector(".filtro");
const semResultado = document.querySelector(".sem-resultado");

const filtrarCategoria = (categoria) => {
  const variaveis = document.querySelectorAll(".variavel");
  let categoriaEncontrada = false;

  if (categoria === "" || categoria === "Todos") {
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
