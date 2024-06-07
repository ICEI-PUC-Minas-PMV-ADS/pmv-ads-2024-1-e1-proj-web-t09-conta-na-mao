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

const validarTamanhoSenha = () => {
  const senha = document.querySelector(".senha").value;

  if (senha.length < 6) {
    alert("A senha deve ter no mínimo 6 caracteres");
    document.querySelector(".senha").value = "";
    document.querySelector(".confSenha").value = "";
  }
};

const validarTelefone = () => {
  let telefone = document.querySelector(".telefone").value.replace(/\D/g, "");

  if (telefone.length > 0) telefone = "(" + telefone;
  if (telefone.length > 3)
    telefone = telefone.substring(0, 3) + ") " + telefone.substring(3);
  if (telefone.length > 9)
    telefone = telefone.substring(0, 10) + "-" + telefone.substring(10);

  document.querySelector(".telefone").value = telefone.substring(0, 15);
};

const validarCPF = () => {
  let cpf = document.querySelector(".cpf").value.replace(/\D/g, "");

  if (cpf.length > 3) cpf = cpf.substring(0, 3) + "." + cpf.substring(3);
  if (cpf.length > 7) cpf = cpf.substring(0, 7) + "." + cpf.substring(7);
  if (cpf.length > 11) cpf = cpf.substring(0, 11) + "-" + cpf.substring(11);

  document.querySelector(".cpf").value = cpf.substring(0, 14);
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
