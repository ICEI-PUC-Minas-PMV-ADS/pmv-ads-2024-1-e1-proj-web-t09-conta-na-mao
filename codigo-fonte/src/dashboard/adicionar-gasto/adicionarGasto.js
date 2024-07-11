const adicionarGasto = () => {
  let nomeGasto = document.getElementById("gasto").value;
  let categoriaGasto = document.getElementById("categoria").value;
  let valorGasto = document.getElementById("valor").value;
  let tipo = categoriaGasto.toLowerCase().replace(" ", "-");

  let verificarCadastro = nomeGasto && categoriaGasto && valorGasto;
  let mensagemEnvio = document.getElementById("mensagemEnvio");

  if (verificarCadastro) {
    valorGasto = formatarValorParaJSON(valorGasto);

    if (
      nomeGasto == "investimento".toLowerCase() ||
      categoriaGasto == "investimento".toLowerCase()
    ) {
      let novoInvestimento = {
        nomeInvestimento: nomeGasto,
        categoriaInvestimento: categoriaGasto,
        valorInvestimento: valorGasto,
        tipo,
        data: new Date().toLocaleDateString(),
      };

      postInvestimento(novoInvestimento);
      adicionarListaDeInvestimentos(novoInvestimento);
    } else {
      let novoGasto = {
        nomeGasto,
        categoriaGasto,
        valorGasto,
        tipo,
        data: new Date().toLocaleDateString(),
      };

      postGasto(novoGasto);
      adicionarListaDeGastos(novoGasto);
    }

    mensagemEnvio.innerHTML = "<span>Conta adicionada com sucesso!</span>";
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
      input.value = formatarValor(input.value);
    }
  });
};

const adicionarListaDeGastos = (novoGasto) => {
  const listaDeGastosLocalStorage = localStorage.getItem("listaDeGastos");
  const listaDeGastos = JSON.parse(listaDeGastosLocalStorage) || { gastos: [] };

  listaDeGastos.gastos.push(novoGasto);
  localStorage.setItem("listaDeGastos", JSON.stringify(listaDeGastos));
};

const adicionarListaDeInvestimentos = (novoInvestimento) => {
  const listaDeInvestimentosLocalStorage = localStorage.getItem(
    "listaDeInvestimentos"
  );
  const listaDeInvestimentos = JSON.parse(listaDeInvestimentosLocalStorage) || {
    investimentos: [],
  };

  listaDeInvestimentos.investimentos.push(novoInvestimento);
  localStorage.setItem(
    "listaDeInvestimentos",
    JSON.stringify(listaDeInvestimentos)
  );
};

const postGasto = (novoGasto) => {
  fetch("http://localhost:3000/listaDeGastos", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(novoGasto),
  })
    .then((resposta) => resposta.json())
    .then((novoGasto) => {
      adicionarListaDeGastos(novoGasto);
    })
    .catch((erro) => console.error("Erro ao enviar para JSON Server", erro));
};

const postInvestimento = (novoInvestimento) => {
  fetch("http://localhost:3000/listaDeInvestimentos", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(novoInvestimento),
  })
    .then((resposta) => resposta.json())
    .then((novoInvestimento) => {
      adicionarListaDeInvestimentos(novoInvestimento);
    })
    .catch((erro) => console.error("Erro ao enviar para JSON Server", erro));
};

tratarValorInput();
