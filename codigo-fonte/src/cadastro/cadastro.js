const cadastrarUsuario = () => {
  try {
    const email = document.querySelector(".email").value;
    const confEmail = document.querySelector(".confEmail").value;
    const senha = document.querySelector(".senha").value;
    const confSenha = document.querySelector(".confSenha").value;
    const nome = document.querySelector(".nome").value;
    const sobrenome = document.querySelector(".sobrenome").value;
    const genero = document.querySelector(".genero").value;
    const cpf = document.querySelector(".cpf").value;
    const telefone = document.querySelector(".telefone").value;
    const dataNascimento = document.querySelector(".dataNascimento").value;
    const ofertas = document.querySelector(".ofertas").checked;
    const objPrincipal = document.querySelector(".objPrincipal").value;
    const frequenciaDeUso = document.querySelector(".frequenciaDeUso").value;
    const indicacaoFinanceira = document.querySelector(
      ".indicacaoFinanceira"
    ).value;

    if (
      !verificarTodosCamposPreenchidos(
        email,
        senha,
        nome,
        sobrenome,
        genero,
        cpf,
        telefone,
        dataNascimento,
        objPrincipal,
        frequenciaDeUso,
        indicacaoFinanceira
      )
    )
      return;
    if (!verificarEmail(email, confEmail)) return;
    if (!verificarSenha(senha, confSenha)) return;

    let novoUsuario = {
      email,
      senha,
      nome,
      sobrenome,
      genero,
      cpf,
      telefone,
      dataNascimento,
      ofertas,
      objPrincipal,
      frequenciaDeUso,
      indicacaoFinanceira,
    };
    postUsuario(novoUsuario);
  } catch (error) {
    console.error("Erro ao cadastrar usuário:", error);
  }
};

const verificarEmail = (email, confEmail) => {
  if (email !== confEmail) {
    alert("Emails não conferem");
    return false;
  }
  if (email === "") {
    alert("Cadastre seu email");
    return false;
  }
  return true;
};

const verificarSenha = (senha, confSenha) => {
  if (senha !== confSenha) {
    alert("Senhas não conferem");
    return false;
  }
  if (senha === "") {
    alert("Cadastre sua senha");
    return false;
  }
  return true;
};

const verificarTodosCamposPreenchidos = (
  email,
  senha,
  nome,
  sobrenome,
  genero,
  cpf,
  telefone,
  dataNascimento,
  objPrincipal,
  frequenciaDeUso,
  indicacaoFinanceira
) => {
  if (
    email === "" ||
    senha === "" ||
    nome === "" ||
    sobrenome === "" ||
    genero === "" ||
    cpf === "" ||
    telefone === "" ||
    dataNascimento === "" ||
    objPrincipal === "" ||
    frequenciaDeUso === "" ||
    indicacaoFinanceira === ""
  ) {
    alert("Preencha todos os campos");
    return false;
  }
  return true;
};

const postUsuario = (novoUsuario) => {
  fetch("http://localhost:3000/usuarios", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(novoUsuario),
  })
    .then((resposta) => resposta.json())
    .then(
      localStorage.setItem("usuarioLogado", JSON.stringify(novoUsuario)),
      (window.location.href = "../login/login.html")
    )
    .catch((erro) => console.error("Erro: ", erro));
};

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
