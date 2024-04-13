# Especificação do Projeto

## Perfis de Usuários

| Perfil 01 | Roberto - 22 anos |
|--------------------|-------|
| Descrição | Recém-ingressado na vida profissional |
| Necessidades | Acesso rápido e fácil às despesas; Controle financeiro abrangente, incluindo gerenciamento e categorização de gastos; Recursos de orçamento para evitar gastos excessivos.  |

| Perfil 02 | Clara - 33 anos |
|--------------------|-------|
| Descrição | Adulta que está planejando seu casamento e tem como objetivo alcançar estabilidade financeira para garantir um futuro próspero e seguro tanto para si mesma quanto para o seu futuro cônjuge |
| Necessidades | Planejamento e acompanhamento das despesas relacionadas ao evento; Estabelecimento de metas financeiras de longo prazo, como economias para a compra de uma casa, fundo de emergência, entre outros; Ferramentas e estratégias para monitorar e reduzir os custos do casamento; Adotar hábitos financeiros saudáveis e boas práticas de gestão. |



## Histórias de Usuários
|EU COMO... `QUEM`   | QUERO/PRECISO ... `O QUE` |PARA ... `PORQUE`                 |
|--------------------|---------------------------|----------------------------------|
| Eu, como usuário individual, desejo uma interface simples e intuitiva no sistema para registrar meus gastos diários, permitindo-me acompanhar minhas finanças de forma eficaz, mesmo que eu tenha pouca experiência em gerenciamento financeiro. Isso facilitará o controle das minhas despesas e ajudará a criar hábitos financeiros saudáveis | Uma interface simples e intuitiva para registrar meus gastos diários | Que eu possa começar a acompanhar minhas finanças de forma eficaz, mesmo com pouca experiência em gerenciamento financeiro |
| Eu, como usuário individual, gostaria de receber sugestões de categorias de gastos comuns com base nos meus hábitos de consumo no sistema. Isso me ajudará a categorizar meus gastos de forma mais eficiente e a compreender melhor meus padrões de consumo, facilitando assim o controle e a análise das minhas finanças pessoais | Receber sugestões de categorias de gastos comuns com base nos meus hábitos de consumo | Que eu possa aprender a categorizar meus gastos de forma mais eficiente e compreender melhor meus padrões de consumo |
| Como usuário individual, gostaria de ter a capacidade de definir metas de economia ou orçamento mensal no sistema, para que eu possa acompanhar meu progresso financeiro, estabelecer metas alcançáveis e trabalhar de forma sistemática para atingi-las | Poder definir metas de economia ou orçamento mensal | Que eu possa começar a estabelecer objetivos financeiros realistas e trabalhar para alcançá-los ao longo do tempo |
| Eu e meu parceiro(a), como recém-casados, desejamos receber recomendações personalizadas de economias ou áreas de corte de gastos específicos no sistema, para que possamos otimizar nossas finanças, adaptar nosso estilo de vida às novas circunstâncias e garantir uma transição financeira suave para nossa vida matrimonial | Receber recomendações de economias ou áreas de corte de gastos específicos para recém-casados | Que possamos otimizar nossas finanças e garantir uma transição financeira suave para a vida matrimonial |
| Eu e meu parceiro(a), como casal, gostaríamos de ter uma funcionalidade de compartilhamento de gastos no sistema, para que possamos visualizar e gerenciar nossas despesas conjuntas, colaborar de forma eficaz na gestão financeira e trabalhar juntos para alcançar nossos objetivos financeiros comuns | Uma funcionalidade de compartilhamento de gastos com meu parceiro(a) para planejarmos juntos nossas finanças futuras | Que possamos ter uma visão clara das despesas conjuntas e trabalhar em conjunto para alcançar nossos objetivos financeiros como casal |

## Requisitos do Projeto

### Requisitos Funcionais

|ID    | Descrição                        | Prioridade |
|-------|---------------------------------|----|
| RF-01 | Os usuários devem ter a opção de se cadastrar na plataforma | Alta  | 
| RF-02 | Os usuários só poderão acessar as informações após efetuarem o login na plataforma | Alta   |
| RF-03 | Os usuários devem poder armazenar seus cupons ficcais | Alta |
| RF-04 | Os usuários devem ter a capacidade de categorizar seus cupons conforme desejaram | Média |
| RF-05 | OS usuários devem ter uma seção dedicada para editar as informações pessoais que inseriram | Média |
| RF-06 | Os usuários poderão visualizar, ao final de cada mês, onde ocorreram seus maiores gastos | Média |

**Prioridade: Alta / Média / Baixa. 

### Requisitos não Funcionais

|ID      | Descrição               |Prioridade |
|--------|-------------------------|----|
| RNF-01 | O sistema deve ser responsivo, adaptando-se a diferentes dispositivos e tamanho de tela | Alta | 
| RNF-02 | Todas as entradas de dados do usuário devem ser validadas e filtradas para prevenir injeções de código malicioso, como SQL injection ou cross-site scripting(XSS) | Alta | 
| RNF-03 | O sistema deve funcionar preferêncialmente nos navegadores Firefox, Chrome, Brave, Edge, Opera e Safari | Alta | 
| RNF-04 | A interface do usuário deve ser intuitiva e fácil de usar, com navegação clara e organizada, de forma que os usuários possam encontrar facilmente o que estão procurando | Média |

**Prioridade: Alta / Média / Baixa. 

