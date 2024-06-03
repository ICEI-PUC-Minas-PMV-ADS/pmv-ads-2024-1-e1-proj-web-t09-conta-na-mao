const adicionarQrCode = () => {
  let nomeGasto = document.getElementById("conta").value;
  let categoriaGasto = document.getElementById("categoria").value;
  let valorGasto = document.getElementById("valor").value;
  let tipo = categoriaGasto.toLowerCase().replace(" ", "-");

  let verificarCadastro = nomeGasto && categoriaGasto && valorGasto;
  let mensagemEnvio = document.getElementById("mensagemEnvio");

  if (verificarCadastro) {
    valorGasto = parseFloat(valorGasto.replace("R$ ", "").replace(",", "."));

    let novoGasto = {
      nomeGasto,
      categoriaGasto,
      valorGasto,
      tipo,
    };
    postQrCode(novoGasto);
    adicionarListaDeGastos(novoGasto);

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
  const listaDeGastos = JSON.parse(listaDeGastosLocalStorage);

  listaDeGastos.gastos.push(novoGasto);
  localStorage.setItem("listaDeGastos", JSON.stringify(listaDeGastos));
};

const postQrCode = (novoGasto) => {
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
