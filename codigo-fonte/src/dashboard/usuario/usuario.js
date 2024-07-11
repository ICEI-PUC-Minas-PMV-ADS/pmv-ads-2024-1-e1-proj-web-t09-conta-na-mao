// VERIFICAR DISPONIBILIDADE DO JSON SERVER

const isJSONServerAvailable = async () => {
  try {
    const response = await fetch("http://localhost:3000");
    return response.ok;
  } catch (error) {
    return false;
  }
};

const usarJSONServer = async () => {
  const jsonServerDisponivel = await isJSONServerAvailable();
  if (jsonServerDisponivel) {
    getDadosDoClienteJSON();
    selecionarResumo();
  } else {
    const usuarioLocal = localStorage.getItem("usuarioLogado");
    const usuarioJSON = JSON.parse(usuarioLocal);
    gerarDados(usuarioJSON);
    getDadosDoClienteLocal();
    selecionarResumo();
  }
};

usarJSONServer();

// PEGAS DADOS DO CLIENTE NO LOCAL STORAGE

const getDadosDoClienteLocal = () => {
  const usuario = localStorage.getItem("usuarioLogado");
  const usuarioJSON = JSON.parse(usuario);
  if (!usuarioJSON) gerarMensagemErroEmTela();

  gerarDados(usuarioJSON);
};

// PEGAR DADOS DO CLIENTE JSON

const getDadosDoClienteJSON = () => {
  fetch("http://localhost:3000/usuarios")
    .then((resposta) => resposta.json())
    .then((usuario) => {
      const usuarioLocal = localStorage.getItem("usuarioLogado");
      const usuarioJSON = JSON.parse(usuarioLocal);
      const idDoUsuario = usuarioJSON.id;
      const usuarioBanco = usuario[0].id;
      if (idDoUsuario === usuarioBanco) gerarDados(usuario[0]);
    })
    .catch((erro) => console.error("Erro ao acessar JSON Server", erro));
};

// SELECIONAR OPÇÕES

const buttons = document.querySelectorAll(".nav-links");

buttons.forEach((button) => {
  button.addEventListener("click", () => {
    buttons.forEach((btn) => btn.classList.remove("botaoAtivo"));
    button.classList.add("botaoAtivo");
  });
});

const infoUsuario = document.querySelector(".info-usuario");
const resumo = document.querySelector(".resumo-mensal");

const selecionarInformacoes = () => {
  infoUsuario.style.display = "flex";
  resumo.style.display = "none";
};

const selecionarResumo = () => {
  infoUsuario.style.display = "none";
  resumo.style.display = "flex";

  mostrarOpcaoMes();
  somarTotalAno();
};

const somarRendasMes = () => {
  const select = document.querySelector("#meses");
  const mesSelecionado = select.options[select.selectedIndex].value.padStart(
    2,
    "0"
  );
  const rendas = localStorage.getItem("listaDeRendas");
  const rendasJSON = JSON.parse(rendas);

  const rendasMes = rendasJSON.rendas.filter(
    (renda) => renda.data.split("/")[1] === mesSelecionado
  );

  const totalRendas = rendasMes.reduce(
    (acc, renda) => acc + renda.valorRenda,
    0
  );

  return formatarValor(totalRendas);
};

const somarGastosMes = () => {
  const select = document.querySelector("#meses");
  const mesSelecionado = select.options[select.selectedIndex].value.padStart(
    2,
    "0"
  );
  const gastos = localStorage.getItem("listaDeGastos");
  const gastosJSON = JSON.parse(gastos);

  const gastosMes = gastosJSON.gastos.filter(
    (gasto) => gasto.data.split("/")[1] === mesSelecionado
  );
  const totalGastos = gastosMes.reduce(
    (acc, gasto) => acc + gasto.valorGasto,
    0
  );

  return formatarValor(totalGastos);
};

const somarInvestimentosMes = () => {
  const select = document.querySelector("#meses");
  const mesSelecionado = select.options[select.selectedIndex].value.padStart(
    2,
    "0"
  );
  const investimentos = localStorage.getItem("listaDeInvestimentos");
  const investimentosJSON = JSON.parse(investimentos);

  const investimentosMes = investimentosJSON.investimentos.filter(
    (investimento) => investimento.data.split("/")[1] === mesSelecionado
  );
  const totalInvestimentos = investimentosMes.reduce(
    (acc, investimento) => acc + investimento.valorInvestimento,
    0
  );

  return formatarValor(totalInvestimentos);
};

const somarTotalMes = () => {
  const totalRendas = somarRendasMes();
  const totalGastos = somarGastosMes();
  const totalInvestimentos = somarInvestimentosMes();

  const total =
    formatarValorParaJSON(totalRendas) - formatarValorParaJSON(totalGastos);
  const totalDisponivel = total - formatarValorParaJSON(totalInvestimentos);

  return formatarValor(totalDisponivel);
};

const mostrarOpcaoMes = () => {
  const resumo = document.querySelector(".resumo-mensal");
  const meses = [
    { nome: "Janeiro", numero: 1 },
    { nome: "Fevereiro", numero: 2 },
    { nome: "Março", numero: 3 },
    { nome: "Abril", numero: 4 },
    { nome: "Maio", numero: 5 },
    { nome: "Junho", numero: 6 },
    { nome: "Julho", numero: 7 },
    { nome: "Agosto", numero: 8 },
    { nome: "Setembro", numero: 9 },
    { nome: "Outubro", numero: 10 },
    { nome: "Novembro", numero: 11 },
    { nome: "Dezembro", numero: 12 },
  ];

  let options = `<option value="0">Total</option>`;
  meses.forEach((mes) => {
    options += `<option value="${mes.numero}">${mes.nome}</option>`;
  });

  resumo.innerHTML = `
    <span>Selecione o mês desejado:</span>
    <select name="meses" id="meses">
      ${options}
    </select>
    <div class="info-geral">
      <div class="info" id="rendas">
        <p>Total de rendas:</p>
        <h4></h4>
      </div>
      <div class="info" id="gastos">
        <p>Total de gastos:</p>
        <h4></h4>
      </div>
      <div class="info" id="investimentos">
        <p>Investimentos:</p>
        <h4></h4>
      </div>
      <div class="info result" id="total">
        <p>Disponível:</p>
        <h4></h4>
      </div>
    </div>
  `;

  const select = document.querySelector("#meses");
  select.addEventListener("change", selecionarOpcaoMes);
};

const selecionarOpcaoMes = () => {
  const select = document.querySelector("#meses");
  const mesSelecionado = select.options[select.selectedIndex].value;

  if (mesSelecionado !== "0") {
    const infoRendas = document.querySelector("#rendas h4");
    infoRendas.innerHTML = somarRendasMes();

    const infoGastos = document.querySelector("#gastos h4");
    infoGastos.innerHTML = somarGastosMes();

    const infoInvestimentos = document.querySelector("#investimentos h4");
    infoInvestimentos.innerHTML = somarInvestimentosMes();

    const infoToral = document.querySelector("#total h4");
    infoToral.innerHTML = somarTotalMes();
  } else {
    somarTotalAno();
  }
};

const somarTotalAno = () => {
  let rendas = localStorage.getItem("listaDeRendas");
  let gastos = localStorage.getItem("listaDeGastos");
  let investimentos = localStorage.getItem("listaDeInvestimentos");

  if (!rendas)
    localStorage.setItem("listaDeRendas", JSON.stringify({ rendas: [] }));
  if (!gastos)
    localStorage.setItem("listaDeGastos", JSON.stringify({ gastos: [] }));
  if (!investimentos)
    localStorage.setItem(
      "listaDeInvestimentos",
      JSON.stringify({ investimentos: [] })
    );

  const rendasJSON = JSON.parse(rendas);
  const gastosJSON = JSON.parse(gastos);
  const investimentosJSON = JSON.parse(investimentos);

  const rendasTotais = rendasJSON.rendas.reduce(
    (acc, renda) => acc + renda.valorRenda,
    0
  );

  const gastosTotais = gastosJSON.gastos.reduce(
    (acc, gasto) => acc + gasto.valorGasto,
    0
  );

  const investimentosTotais = investimentosJSON.investimentos.reduce(
    (acc, gasto) => acc + gasto.valorInvestimento,
    0
  );

  const totalDisponivel = rendasTotais - gastosTotais - investimentosTotais;

  const returnTotalDisponivel = totalDisponivel.toFixed(2).replace(".", ",");

  const infoRendas = document.querySelector("#rendas h4");
  infoRendas.innerHTML = formatarValor(rendasTotais);

  const infoGastos = document.querySelector("#gastos h4");
  infoGastos.innerHTML = formatarValor(gastosTotais);

  const infoInvestimentos = document.querySelector("#investimentos h4");
  infoInvestimentos.innerHTML = formatarValor(investimentosTotais);

  const infoTotal = document.querySelector("#total h4");
  infoTotal.innerHTML = formatarValor(returnTotalDisponivel);
};

// FORMATAR DADOS

const formatarData = (data) => {
  const dataFormatada = new Date(data);
  const dia = dataFormatada.getDate().toString().padStart(2, "0");
  const mes = (dataFormatada.getMonth() + 1).toString().padStart(2, "0");
  const ano = dataFormatada.getFullYear().toString();

  return `${dia}/${mes}/${ano}`;
};

const gerarDados = (usuario) => {
  const usuarioNome = document.querySelector(".usuario-nome span");
  const usuarioDados = document.querySelector(".usuario-dados");

  usuarioNome.innerHTML = `${usuario.nome} ${usuario.sobrenome}`;

  usuarioDados.innerHTML = `
  <p>Email: <span>${usuario.email}</span></p>
  <p>CPF: <span>${usuario.cpf}</span></p>
  <p>Contato: <span>${usuario.telefone}</span></p>
  <p>Nascimento: <span>${formatarData(usuario.dataNascimento)}</span></p>
  `;
};

const gerarMensagemErroEmTela = () => {
  const usuarioNome = document.querySelector(".usuario-nome span");
  const usuarioDados = document.querySelector(".usuario-dados");
  const usuarioBotoes = document.querySelector(".usario-botoes");

  usuarioNome.innerHTML = `<p>Erro</p>`;
  usuarioDados.innerHTML = `<p>Usuário não encontrado, faça o login.</p>`;
  usuarioBotoes.innerHTML = `<button class="botao-secundario" onclick="window.location.href = '../../index.html'">Voltar a página principal</button>`;
};

// MUDAR SENHA

const mudarSenha = () => {
  alert("Essa opção está indisponível no momento.");
};

// EXCLUIR USUÁRIO

const excluirUsuario = () => {
  const usuario = localStorage.getItem("usuarioLogado");
  const usuarioJSON = JSON.parse(usuario);
  const idDoUsuario = usuarioJSON.id;

  if (idDoUsuario) {
    excluirUsuarioDoBanco(idDoUsuario);

    localStorage.removeItem("usuarioLogado");
    window.location.href = "../../index.html";
  }
};

const excluirUsuarioDoBanco = (id) => {
  fetch(`http://localhost:3000/usuarios?id=${id}`, {
    method: "DELETE",
  })
    .then(console.log("Usuário excluído."))
    .catch((erro) => console.error("Erro: ", erro));
};

somarTotalAno();
