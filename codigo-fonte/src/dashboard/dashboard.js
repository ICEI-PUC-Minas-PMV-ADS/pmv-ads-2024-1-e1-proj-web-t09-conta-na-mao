// teste para gerar os cards

let listaDeRendas = [
  {
    nomeRenda: "Salário",
    categoriaRenda: "Renda",
    valorRenda: 2574.6,
    tipo: "renda",
  },
];

let listaDeGastos = [
  {
    nomeGasto: "Aluguel",
    categoriaGasto: "Gasto fixo",
    valorGasto: 1000,
    tipo: "gasto-fixo",
  },
  {
    nomeGasto: "Luz",
    categoriaGasto: "Casa",
    valorGasto: 117.5,
    tipo: "casa",
  },
  {
    nomeGasto: "Água",
    categoriaGasto: "Casa",
    valorGasto: 82.32,
    tipo: "casa",
  },
  {
    nomeGasto: "Mercado",
    categoriaGasto: "Mercado",
    valorGasto: 426.58,
    tipo: "mercado",
  },
  {
    nomeGasto: "Shopping",
    categoriaGasto: "Compras",
    valorGasto: 197.96,
    tipo: "compras",
  },
];

let listaInvestimentos = [
  {
    nomeInvestimento: "Poupança",
    categoriaInvestimento: "Investimento",
    valorInvestimento: 500,
    tipo: "investimento",
  },
];

const gerarRelatorio = () => {
  let listaVariaveis = document.getElementsByClassName("itens-variaveis")[0];
  listaDeRendas.forEach((conta) => {
    listaVariaveis.innerHTML += `
      <div class="variavel">
        <div class="itens-categorias">
          <img src="./imagens/arrow-up.svg" alt="Seta para cima" />
          <span class="item-nome">${conta.nomeRenda}</span>
          <span class="item-categoria ${conta.tipo}">${
      conta.categoriaRenda
    }</span>
        </div>
        <span class="item-valor renda-valor">R$ ${conta.valorRenda
          .toFixed(2)
          .replace(".", ",")}</span>
      </div>
    `;
  });

  listaDeGastos.forEach((conta) => {
    listaVariaveis.innerHTML += `
      <div class="variavel">
        <div class="itens-categorias">
          <img src="./imagens/arrow-down.svg" alt="Seta para baixo" />
          <span class="item-nome">${conta.nomeGasto}</span>
          <span class="item-categoria ${conta.tipo}">${
      conta.categoriaGasto
    }</span>
        </div>
        <span class="item-valor gasto-valor">- R$ ${conta.valorGasto
          .toFixed(2)
          .replace(".", ",")}</span>
      </div>
    `;
  });
};

const atualizarRendaTotal = () => {
  let saldoRendas = 0;
  let valoresRenda = document.querySelectorAll(".renda-valor");

  valoresRenda.forEach((valorRenda) => {
    let valor = parseFloat(
      valorRenda.textContent.replace("R$ ", "").replace(",", ".")
    );
    saldoRendas += valor;
  });

  let totalRenda = document.querySelector("#rendas h4");
  totalRenda.innerText = `R$ ${saldoRendas.toFixed(2).replace(".", ",")}`;

  return saldoRendas;
};

const atualizarGastoTotal = () => {
  let saldoGastos = 0;
  let valoresGasto = document.querySelectorAll(".gasto-valor");

  valoresGasto.forEach((valorGasto) => {
    let valor = parseFloat(
      valorGasto.textContent.replace("- R$ ", "").replace(",", ".")
    );
    saldoGastos += valor;
  });

  let totalGasto = document.querySelector("#gastos h4");
  totalGasto.innerText = `R$ ${saldoGastos.toFixed(2).replace(".", ",")}`;

  return saldoGastos;
};

const atualizarInvestimentoTotal = () => {
  let saldoInvestimentos = 0;
  // let valoresInvestimento = document.querySelectorAll(".investimento-valor");

  // teste com lista
  listaInvestimentos.forEach((valorInvestimento) => {
    // let valor = parseFloat(
    //   valorInvestimento.textContent.replace("R$ ", "").replace(",", ".")
    // );
    let valor = valorInvestimento.valorInvestimento;
    saldoInvestimentos += valor;
  });

  let totalInvestimento = document.querySelector("#investimentos h4");
  totalInvestimento.innerText = `R$ ${saldoInvestimentos
    .toFixed(2)
    .replace(".", ",")}`;

  return saldoInvestimentos;
};

const atualizarSaldoTotal = () => {
  let totalRendas = atualizarRendaTotal();
  let totalGastos = atualizarGastoTotal();
  let totalInvestimentos = atualizarInvestimentoTotal();

  let saldoTotal = totalRendas - (totalGastos + totalInvestimentos);

  let total = document.querySelector("#total h4");
  total.innerText = `R$ ${saldoTotal.toFixed(2).replace(".", ",")}`;

  if (saldoTotal > 0) {
    total.classList.add("disponivel");
  } else if (saldoTotal <= 0) {
    total.classList.add("indisponivel");
  }
};

gerarRelatorio();
atualizarSaldoTotal();

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
