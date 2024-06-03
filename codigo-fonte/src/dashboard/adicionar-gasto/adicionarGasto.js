const adicionarGasto = () => {
  let nomeGasto = document.getElementById("gasto").value;
  let categoriaGasto = document.getElementById("categoria").value;
  let valorGasto = document.getElementById("valor").value;
  let tipo = categoriaGasto.toLowerCase().replace(" ", "-");

  let verificarCadastro = nomeGasto && categoriaGasto && valorGasto;
  let mensagemEnvio = document.getElementById("mensagemEnvio");

  if (verificarCadastro) {
    valorGasto = parseFloat(valorGasto.replace("R$ ", "").replace(",", "."));

    if (
      nomeGasto == "investimento".toLowerCase() ||
      categoriaGasto == "investimento".toLowerCase()
    ) {
      let novoInvestimento = {
        nomeInvestimento: nomeGasto,
        categoriaInvestimento: categoriaGasto,
        valorInvestimento: valorGasto,
        tipo,
      };

      postInvestimento(novoInvestimento);
      adicionarListaDeInvestimentos(novoInvestimento);
    } else {
      let novoGasto = {
        nomeGasto,
        categoriaGasto,
        valorGasto,
        tipo,
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
      let valor = parseFloat(input.value.replace("R$ ", ""));
      input.value = "R$ " + valor.toFixed(2).replace(".", ",");
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
  const listaDeInvestimentos = JSON.parse(listaDeInvestimentosLocalStorage);

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
    .catch((erro) => console.error("Erro: ", erro));
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
