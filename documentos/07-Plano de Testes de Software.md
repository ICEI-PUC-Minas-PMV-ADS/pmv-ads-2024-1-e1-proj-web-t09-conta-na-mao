# Plano de Testes de Software

# Plano de Testes de Software

Pré-requisitos: [Especificação do Projeto](https://github.com/ICEI-PUC-Minas-PMV-ADS/pmv-ads-2024-1-e1-proj-web-t09-conta-na-mao/blob/main/documentos/02-Especifica%C3%A7%C3%A3o%20do%20Projeto.md) e [Projeto de Interface](https://github.com/ICEI-PUC-Minas-PMV-ADS/pmv-ads-2024-1-e1-proj-web-t09-conta-na-mao/blob/main/documentos/04-Projeto%20de%20Interface.md).

Os requisitos para realização dos testes de software são:

- Site publicado na internet;
- Navegador da internet: Chrome, Firefox ou Edge.

---

---

| Caso de Teste                                | CT-01: Verificar o funcionamento do cadastro da página Home                                                                                                                                                                                                                                  |
| :------------------------------------------- | :------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Requisitos Associados                        | RF-001: Os usuários devem ter a opção de se cadastrar na plataforma.                                                                                                                                                                                                                         |
| Objetivo do Teste                            | Verificar se os usuários podem se cadastrar na plataforma com sucesso.                                                                                                                                                                                                                       |
| Passos                                       | 1. Acessar o navegador <br> 2. Informar o endereço do site. <br> 3. Visualizar a página Home. <br> 4. Clicar no link "Cadastrar" da página Home. <br> 5. Preencher os campos do formulário. <br> 6. Clicar no botão de Enviar para cadastrar. <br> 7. Ser redirecionado para a página Login. |
| Critérios de êxito                           | - O usuário deve ser redirecionado para a página Login após o cadastro bem-sucedido. <br> - O sistema deve armazenar corretamente os dados do novo usuário.                                                                                                                                  |
| Responsável pela elaboração do caso de Teste | Angelo A. A. Oliveira                                                                                                                                                                                                                                                                        |

---

---

| Caso de Teste                                | CT-02: Verificar o acesso da página Dashboard                                                                                                                        |
| :------------------------------------------- | :------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Requisitos Associados                        | RF-002: Os usuários só poderão acessar as informações após efetuarem o login na plataforma.                                                                          |
| Objetivo do Teste                            | Verificar se os usuários são redirecionados para o login ao tentarem acessar a página Dashboard sem login.                                                           |
| Passos                                       | 1. Acessar o navegador <br> 2. Informar o endereço do site. <br> 3. Acessar a página Dashboard. <br> 4. Ser redirecionado para a página Login.                       |
| Critérios de êxito                           | - O usuário deve visualizar uma mensagem de erro indicando que o login é necessário. <br> - O usuário deve ser redirecionado automaticamente para a página de login. |
| Responsável pela elaboração do caso de Teste | Karina Nunes                                                                                                                                                         |

---

---

| Caso de Teste                                | CT-03: Armazenamento de Cupons Fiscais                                                                                                                                                                         |
| :------------------------------------------- | :------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Requisitos Associados                        | RF-003: Os usuários devem poder armazenar seus cupons fiscais.                                                                                                                                                 |
| Objetivo do Teste                            | Verificar se os usuários podem armazenar seus cupons fiscais na plataforma.                                                                                                                                    |
| Passos                                       | 1. Acessar o navegador. <br> 2. Informar o endereço do site. <br> 3. Visualizar a página Ler QR Code. <br> 4. Fazer o upload de um cupom fiscal válido. <br> 5. Verificar se o cupom é armazenado com sucesso. |
| Critérios de êxito                           | - O cupom fiscal deve ser armazenado corretamente no sistema. <br> - O sistema deve permitir o armazenamento de diferentes tipos de cupons fiscais.                                                            |
| Responsável pela elaboração do caso de Teste | Karina Nunes                                                                                                                                                                                                   |

---

---

| Caso de Teste                                | CT-04: Categorização de Cupons                                                                                                                                                                                                                                                                         |
| :------------------------------------------- | :----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Requisitos Associados                        | RF-004: Os usuários devem ter a capacidade de categorizar seus cupons conforme desejaram.                                                                                                                                                                                                              |
| Objetivo do Teste                            | Verificar se os usuários podem categorizar seus cupons fiscais na plataforma.                                                                                                                                                                                                                          |
| Passos                                       | 1. Acessar o navegador. <br> 2. Informar o endereço do site. <br> 3. Visualizar a página Ler QR Code. <br> 4. Atribuir uma categoria ao cupom. <br> 5. Verificar se o cupom é armazenado com sucesso. <br> 6. Acessar a página Categoria. <br> 7. Verificar se a categoria foi armazenada com sucesso. |
| Critérios de êxito                           | - O usuário deve conseguir atribuir categorias aos seus cupons fiscais. <br> - O sistema deve armazenar e exibir as categorias.                                                                                                                                                                        |
| Responsável pela elaboração do caso de Teste | Karina Nunes                                                                                                                                                                                                                                                                                           |

---

---

| Caso de Teste                                | CT-05: Verificar o funcionamento da edição de informações pessoais                                                                                                                                                                                                           |
| :------------------------------------------- | :--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Requisitos Associados                        | RF-005: Os usuários devem ter uma seção dedicada para editar as informações pessoais que inseriram.                                                                                                                                                                          |
| Objetivo do Teste                            | Verificar se os usuários podem editar suas informações pessoais na plataforma com sucesso.                                                                                                                                                                                   |
| Passos                                       | 1. Acessar o navegador <br> 2. Informar o endereço do site <br> 3. Fazer login na plataforma <br> 4. Visualizar a página Dashboard <br> 5. Acessar a página Usuário. <br> 6. Acessar a aba Informações. <br> 7. Editar as informações desejadas <br> 8. Salvar as alterações |
| Critérios de êxito                           | As informações pessoais devem ser atualizadas corretamente e refletidas na conta do usuário após a edição.                                                                                                                                                                   |
| Responsável pela elaboração do caso de Teste | Karina Nunes                                                                                                                                                                                                                                                                 |

---

---

| Caso de Teste                                | CT-06: Visualização de Maiores Gastos                                                                                                                                                                    |
| :------------------------------------------- | :------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Requisitos Associados                        | RF-06: Os usuários poderão visualizar onde ocorreram seus maiores gastos.                                                                                                                                |
| Objetivo do Teste                            | Verificar se os usuários podem visualizar onde ocorreram seus maiores gastos ao final de cada mês.                                                                                                       |
| Passos                                       | 1. Acessar o navegador. <br> 2. Informar o endereço do site. <br> 3. Visualizar a página Dashboard. <br> 4. Selecionar o mês desejado. <br> 5. Verificar se os maiores gastos são exibidos corretamente. |
| Critérios de êxito                           | - O sistema deve exibir corretamente os gastos do usuário. <br> - Os dados exibidos devem estar corretos e atualizados de acordo com as transações dos usuários.                                         |
| Responsável pela elaboração do caso de Teste | Karina Nunes                                                                                                                                                                                             |

---

---

> **Links Úteis**:
>
> - [IBM - Criação e Geração de Planos de Teste](https://www.ibm.com/developerworks/br/local/rational/criacao_geracao_planos_testes_software/index.html)
> - [Teste de Software: Conceitos e tipos de testes](https://blog.onedaytesting.com.br/teste-de-software/)
> - [Criação e Geração de Planos de Teste de Software](https://www.ibm.com/developerworks/br/local/rational/criacao_geracao_planos_testes_software/index.html)
> - [Ferramentas de Test para Java Script](https://geekflare.com/javascript-unit-testing/)
> - [UX Tools](https://uxdesign.cc/ux-user-research-and-user-testing-tools-2d339d379dc7)
