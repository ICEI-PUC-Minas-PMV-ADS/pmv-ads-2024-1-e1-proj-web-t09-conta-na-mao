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

// VERIFICAR DISPONIBILIDADE DO JSON SERVER

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
  if (jsonServerDisponivel) {
    getListaDeRendas();
    getListaDeGastos();
    getListaDeInvestimentos();
  } else {
    gerarListaDeRendasLocal();
    gerarListaDeGastosLocal();
    gerarListaDeInvestimentosLocal();
    atualizarSaldoTotal();
  }
};

usarJSONServer();

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
          <span class="item-categoria padrao ${conta.tipo}">${
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
          <span class="item-categoria padrao ${conta.tipo}">${
      conta.categoriaInvestimento
    }</span>
        </div>
          <span class="item-valor investimento-valor">- R$ ${parseFloat(
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

// PEGAR DADOS NO LOCAL STORAGE

const mesAtualDoUsuario = () => {
  const dataAtual = new Date();
  const mesAtual = dataAtual.getMonth() + 1;

  return mesAtual;
};

const verificarMesDoObjeto = (dataObjeto) => {
  const mesAtual = mesAtualDoUsuario();
  const partesData = dataObjeto.split("/");
  const mesObjeto = parseInt(partesData[1], 10);
  return mesObjeto === mesAtual;
};

const gerarListaDeRendasLocal = () => {
  let listaDeRendas = JSON.parse(localStorage.getItem("listaDeRendas"));

  if (!listaDeRendas) return (listaDeRendas = { rendas: [] });

  const rendas = listaDeRendas.rendas.filter((renda) => {
    return verificarMesDoObjeto(renda.data);
  });

  gerarItensDeRendas(rendas);
  atualizarRendaTotal();
};

const gerarListaDeGastosLocal = () => {
  let listaDeGastos = JSON.parse(localStorage.getItem("listaDeGastos"));

  if (!listaDeGastos) return (listaDeGastos = { gastos: [] });

  const gastos = listaDeGastos.gastos.filter((gasto) => {
    return verificarMesDoObjeto(gasto.data);
  });

  gerarItensDeGastos(gastos);
  atualizarGastoTotal();
};

const gerarListaDeInvestimentosLocal = () => {
  let listaDeInvestimentos = JSON.parse(
    localStorage.getItem("listaDeInvestimentos")
  );

  if (!listaDeInvestimentos) return { investimentos: [] };

  const investimentos = listaDeInvestimentos.investimentos.filter(
    (investimento) => {
      return verificarMesDoObjeto(investimento.data);
    }
  );

  gerarItensDeInvestimentos(investimentos);
  atualizarInvestimentoTotal();
};

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
