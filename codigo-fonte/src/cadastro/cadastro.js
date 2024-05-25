const cadastrarUsuario = () => {
  try {
    const email = document.getElementById("email").value;
    const confEmail = document.getElementById("confEmail").value;
    const senha = document.getElementById("senha").value;
    const confSenha = document.getElementById("confSenha").value;
    const nome = document.getElementById("nome").value;
    const sobrenome = document.getElementById("sobrenome").value;
    const genero = document.getElementById("genero").value;
    const cpf = document.getElementById("cpf").value;
    const telefone = document.getElementById("telefone").value;
    const dataNascimento = document.getElementById("dataNascimento").value;
    const ofertas = document.getElementById("ofertas").checked;
    const objPrincipal = document.getElementById("objPrincipal").value;
    const frequenciaDeUso = document.getElementById("frequenciaDeUso").value;
    const indicacaoFinanceira = document.getElementById(
      "indicacaoFinanceira"
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
    .then((dados) => {
      localStorage.setItem("usuarioLogado", JSON.stringify(dados));
      window.location.href = "../cadastro/cadastro.html";
    })
    .catch((erro) => console.error("Erro: ", erro));
};
