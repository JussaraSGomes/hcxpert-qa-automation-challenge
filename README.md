# HCXpert QA Automation Challenge

Projeto desenvolvido para o **Desafio Técnico de Engenharia de Qualidade — QA/SDET da HCXpert**, contemplando automação de testes Web e API com Cypress, Cucumber, JavaScript e Page Object Model.

A solução foi estruturada com foco em legibilidade, reutilização, separação de responsabilidades, independência dos cenários e geração automática de evidências e relatórios.

---

## Sumário

- [Objetivo](#objetivo)
- [Tecnologias utilizadas](#tecnologias-utilizadas)
- [Arquitetura da solução](#arquitetura-da-solução)
- [Estrutura do projeto](#estrutura-do-projeto)
- [Pré-requisitos](#pré-requisitos)
- [Instalação](#instalação)
- [Execução dos testes](#execução-dos-testes)
- [Cenários automatizados](#cenários-automatizados)
- [Massa de dados](#massa-de-dados)
- [Evidências](#evidências)
- [Relatórios Cucumber](#relatórios-cucumber)
- [Integração com Xray](#integração-com-xray)
- [Parecer técnico](#parecer-técnico)
- [Matriz de atendimento](#matriz-de-atendimento)
- [Melhorias futuras](#melhorias-futuras)
- [Autoria](#autoria)

---

## Objetivo

O projeto tem como objetivo validar os principais fluxos da plataforma [Automation Exercise](https://www.automationexercise.com), além de realizar testes de integração com a API pública do Trello.

Foram automatizados cenários relacionados a:

- criação de conta pela API;
- autenticação de usuário;
- pesquisa de produtos;
- inclusão de produto no carrinho;
- validação de dados do carrinho;
- checkout e pagamento;
- validação de campos obrigatórios;
- consulta de ação do Trello;
- tratamento de cenários positivos e negativos.

---

## Tecnologias utilizadas

- **JavaScript**
- **Node.js**
- **Cypress**
- **Cucumber**
- **Gherkin**
- **Page Object Model**
- **Esbuild**
- **PowerShell**
- **HTML**
- **JSON**
- **Git e GitHub**

### Principais dependências

```json
{
  "cypress": "15.18.1",
  "@badeball/cypress-cucumber-preprocessor": "24.0.1",
  "@bahmutov/cypress-esbuild-preprocessor": "2.2.8"
}
```

---

## Arquitetura da solução

A automação foi organizada com separação entre as camadas de especificação, tradução dos cenários e implementação técnica.

```text
Feature
   ↓
Step Definition
   ↓
Page Object / API Object
   ↓
Cypress
```

### Responsabilidades das camadas

#### Features

Os arquivos `.feature` descrevem os comportamentos esperados em formato Gherkin, utilizando linguagem declarativa.

#### Step Definitions

Os Steps realizam somente o vínculo entre as sentenças Gherkin e os métodos responsáveis pela automação.

Não são mantidos nos Steps:

- seletores;
- requisições HTTP;
- payloads;
- regras de navegação;
- validações detalhadas;
- tratamento de assincronismo;
- manipulação direta de elementos.

#### Page Objects

Os Page Objects concentram:

- seletores;
- ações executadas nas páginas;
- validações reutilizáveis;
- preparação dos fluxos;
- tratamento do encadeamento assíncrono do Cypress;
- chamadas das APIs.

Embora `createAccountPage.js` e `trelloPage.js` representem serviços, eles seguem o mesmo princípio de isolamento adotado pelo Page Object Model, funcionando como objetos responsáveis pelos endpoints utilizados no desafio.

---

## Estrutura do projeto

```text
.
├── cypress/
│   ├── e2e/
│   │   ├── features/
│   │   │   ├── login.feature
│   │   │   ├── search.feature
│   │   │   ├── add_to_cart.feature
│   │   │   ├── checkout.feature
│   │   │   ├── api_trello.feature
│   │   │   └── api_create_account.feature
│   │   │
│   │   └── step_definitions/
│   │       ├── loginSteps.js
│   │       ├── searchSteps.js
│   │       ├── cartSteps.js
│   │       ├── checkoutSteps.js
│   │       ├── apiTrelloSteps.js
│   │       └── apiCreateAccountSteps.js
│   │
│   ├── evidencias/
│   │   ├── login.feature/
│   │   ├── search.feature/
│   │   ├── add_to_cart.feature/
│   │   ├── checkout.feature/
│   │   ├── api_trello.feature/
│   │   ├── api_create_account.feature/
│   │   ├── cucumber-report.html
│   │   └── cucumber-report.json
│   │
│   ├── fixtures/
│   │   └── users.json
│   │
│   └── support/
│       ├── page_objects/
│       │   ├── loginPage.js
│       │   ├── homePage.js
│       │   ├── productsPage.js
│       │   ├── cartPage.js
│       │   ├── checkoutPage.js
│       │   ├── createAccountPage.js
│       │   └── trelloPage.js
│       │
│       └── e2e.js
│
├── scripts/
│   ├── templates/
│   │   ├── api-evidence-01.html
│   │   └── api-evidence-02.html
│   │
│   ├── capture-chrome-window.ps1
│   ├── capture-api-evidencias.mjs
│   ├── generate-report.mjs
│   └── upload-xray.mjs
│
├── .env.example
├── .gitignore
├── cypress.config.js
├── package.json
├── package-lock.json
└── README.md
```

O arquivo `api_create_account.feature` foi adicionado como complemento à estrutura obrigatória para separar a responsabilidade da API de criação de conta da consulta ao Trello.

---

## Pré-requisitos

Antes de executar o projeto, é necessário possuir:

- Node.js 20 ou superior;
- npm;
- Git;
- Google Chrome;
- sistema operacional compatível com Cypress.

Versões utilizadas durante o desenvolvimento:

```text
Node.js: 22.16.0
npm: 10.9.2
Git: 2.54.0
Cypress: 15.18.1
```

---

## Instalação

Clone o repositório:

```bash
git clone https://github.com/JussaraSGomes/hcxpert-qa-automation-challenge.git
```

Acesse a pasta:

```bash
cd hcxpert-qa-automation-challenge
```

Instale as dependências:

```bash
npm install
```

Valide a instalação do Cypress:

```bash
npx cypress verify
```

---

## Execução dos testes

### Abrir o Cypress em modo interativo

```bash
npm run cy:open
```

### Executar toda a suíte

```bash
npm run test
```

ou:

```bash
npm run cy:run
```

### Executar no Google Chrome

```bash
npm run test:chrome
```

### Executar somente Login

```bash
npm run test:login
```

### Executar somente Pesquisa

```bash
npm run test:search
```

### Executar somente Carrinho

```bash
npm run test:cart
```

### Executar somente Checkout

```bash
npm run test:checkout
```

### Executar API de criação de conta

```bash
npm run test:create-account
```

### Executar API do Trello

```bash
npm run test:trello
```

### Executar em Chrome visível pelo PowerShell

```bash
npm run test:chrome:headed
```

Também é possível informar uma feature específica:

```powershell
powershell -ExecutionPolicy Bypass -File scripts/capture-chrome-window.ps1 -Spec "cypress/e2e/features/login.feature"
```

---

## Cenários automatizados

A suíte possui **13 cenários automatizados**.

### API — Criação de conta

1. Criar uma conta com dados válidos.
2. Não criar uma conta com e-mail já cadastrado.

### Login

1. Realizar login com credenciais válidas.
2. Não realizar login com senha inválida.
3. Não realizar login sem preencher o e-mail.

### Pesquisa de produtos

1. Pesquisar um produto existente.
2. Pesquisar um produto inexistente.

### Carrinho

1. Adicionar produto ao carrinho a partir da listagem.
2. Acessar o carrinho sem adicionar produtos.

### Checkout

1. Finalizar uma compra preenchendo os dados obrigatórios.
2. Não finalizar uma compra sem preencher os dados obrigatórios do cartão.

### API — Trello

1. Consultar uma ação existente.
2. Consultar uma ação inexistente.

### Resultado da execução

```text
13 cenários executados
13 cenários aprovados
0 falhas
```

---

## Massa de dados

As massas estáticas estão centralizadas no arquivo:

```text
cypress/fixtures/users.json
```

O arquivo contém:

- dados-base do usuário;
- senha inválida;
- produtos utilizados nas pesquisas;
- dados fictícios de pagamento;
- identificadores válidos e inválidos da API do Trello.

### Criação dinâmica de usuários

Os cenários de Login e Checkout não dependem de uma conta cadastrada manualmente.

Antes da autenticação, o projeto:

1. gera um endereço de e-mail único;
2. cria uma conta pela API;
3. captura as credenciais geradas;
4. utiliza o usuário no fluxo Web.

Essa abordagem reduz a dependência de massas previamente cadastradas e torna os testes mais independentes e repetíveis.

Nenhuma senha pessoal ou credencial de produção é utilizada no projeto.

---

## Evidências

O projeto gera screenshots automaticamente ao final dos cenários.

As evidências são armazenadas dentro de:

```text
cypress/evidencias/
```

Exemplos:

```text
cypress/evidencias/login.feature/
cypress/evidencias/search.feature/
cypress/evidencias/add_to_cart.feature/
cypress/evidencias/checkout.feature/
```

As capturas incluem:

- cenário executado;
- passos do Cucumber;
- comandos do Cypress;
- estado final da aplicação.

O comando customizado responsável pelas capturas está registrado em:

```text
cypress/support/e2e.js
```

Essa implementação evita a inclusão de comandos de screenshot nos arquivos de Steps ou Page Objects.

---

## Relatórios Cucumber

O projeto gera relatórios nos formatos HTML e JSON:

```text
cypress/evidencias/cucumber-report.html
cypress/evidencias/cucumber-report.json
```

Para executar toda a suíte e validar os relatórios:

```bash
npm run report
```

O script:

```text
scripts/generate-report.mjs
```

valida:

- existência do relatório HTML;
- existência do relatório JSON;
- geração de arquivos não vazios.

### Evidências específicas das APIs

Após a geração do relatório JSON, execute:

```bash
npm run evidence:api
```

O script:

```text
scripts/capture-api-evidencias.mjs
```

utiliza os templates da pasta:

```text
scripts/templates/
```

e gera:

```text
cypress/evidencias/api_trello.feature/api-trello-evidence.html
cypress/evidencias/api_create_account.feature/api-create-account-evidence.html
```

---

## Integração com Xray

O projeto possui um script preparado para envio do relatório Cucumber ao Xray:

```text
scripts/upload-xray.mjs
```

O script não possui tokens, URLs ou credenciais hardcoded.

As variáveis esperadas são:

```env
XRAY_IMPORT_URL=
XRAY_TOKEN=
```

Modelo disponível em:

```text
.env.example
```

Para executar:

```bash
npm run xray:upload
```

A execução real depende das credenciais e do endpoint do ambiente Xray disponibilizado pela empresa.

---

# Parecer técnico

## Avaliação da testabilidade

A aplicação Automation Exercise apresenta boa testabilidade para automações Web, principalmente pela presença de atributos como `data-qa` em campos relevantes dos fluxos de autenticação e pagamento.

Esses atributos possibilitam a utilização de seletores mais estáveis e menos dependentes da estrutura visual da página.

Os fluxos principais possuem comportamentos bem definidos e permitem validar:

- autenticação;
- mensagens de erro;
- resultados de pesquisa;
- persistência de produtos;
- integridade de nome, preço e quantidade;
- preenchimento de checkout;
- obrigatoriedade dos campos;
- confirmação do pedido.

A existência de uma página pública com casos de teste também auxilia no levantamento inicial das regras de negócio. Entretanto, os casos disponibilizados pelo site possuem formato predominantemente operacional, com instruções de interface, exigindo refinamento para a construção de cenários BDD declarativos.

## Desafios encontrados

### Criação e manutenção da massa de usuários

A aplicação não disponibiliza uma conta padrão para autenticação.

Para evitar dependência de dados criados manualmente, foi implementada a criação dinâmica de usuários pela API antes dos cenários que exigem autenticação.

### Dependência entre os fluxos

O checkout depende de:

- usuário cadastrado;
- autenticação concluída;
- produto adicionado ao carrinho;
- navegação até a revisão do pedido.

Esse encadeamento exigiu tratamento cuidadoso da fila assíncrona do Cypress para impedir que uma etapa fosse executada antes da conclusão da anterior.

### Diferença entre status HTTP e código de negócio

A API de criação de conta pode transportar o resultado funcional no campo `responseCode` do corpo da resposta.

Por isso, o projeto diferencia:

- status HTTP;
- código de negócio;
- mensagem retornada pela API.

### Seletores distintos entre Carrinho e Checkout

A página de carrinho e a página de revisão do pedido utilizam estruturas HTML diferentes.

A validação precisou utilizar seletores específicos para cada contexto, evitando o reaproveitamento incorreto de elementos entre páginas.

### Validações nativas do navegador

Alguns campos obrigatórios utilizam validação nativa do HTML.

Nesses casos, a automação valida propriedades como:

```javascript
checkValidity()
```

em vez de depender exclusivamente de mensagens visuais da aplicação.

### Isolamento das responsabilidades

Durante o desenvolvimento, foi necessário garantir que os Steps não concentrassem:

- seletores;
- fixtures;
- estruturas condicionais;
- payloads;
- comandos Cypress;
- lógica de navegação.

A solução adotada foi concentrar as operações técnicas nos Page Objects e manter os Steps como uma camada exclusivamente declarativa.

## Considerações finais

A aplicação possui boa cobertura para prática de automação funcional e de serviços. No entanto, a ausência de uma especificação formal completa de regras de negócio exige validação exploratória e consulta aos comportamentos reais da interface e das APIs.

Para um ambiente corporativo, seriam recomendadas documentações adicionais contendo:

- contratos das APIs;
- regras de validação dos campos;
- comportamento esperado para carrinho vazio;
- regras relacionadas à expiração e bandeira do cartão;
- requisitos de segurança;
- critérios de aceite;
- política de limpeza das massas criadas durante os testes.

---

# Matriz de atendimento

| Requisito | Status | Evidência |
|---|---|---|
| Cucumber e Gherkin declarativo | Plenamente atendido | Arquivos `.feature` |
| JavaScript | Plenamente atendido | Código-fonte do projeto |
| Cypress em versão recente | Plenamente atendido | `package.json` |
| Page Object Model | Plenamente atendido | `cypress/support/page_objects` |
| Estrutura obrigatória | Plenamente atendido | Árvore do projeto |
| Login positivo | Plenamente atendido | `login.feature` |
| Login negativo | Plenamente atendido | `login.feature` |
| Pesquisa com resultado | Plenamente atendido | `search.feature` |
| Pesquisa sem resultado | Plenamente atendido | `search.feature` |
| Adição de produto ao carrinho | Plenamente atendido | `add_to_cart.feature` |
| Validação de nome, preço e quantidade | Plenamente atendido | `cartPage.js` |
| Carrinho vazio | Plenamente atendido | `add_to_cart.feature` |
| Checkout completo | Plenamente atendido | `checkout.feature` |
| Campos obrigatórios do pagamento | Plenamente atendido | `checkout.feature` |
| GET Trello | Plenamente atendido | `api_trello.feature` |
| Extração de `data.list.name` | Plenamente atendido | `trelloPage.js` |
| POST Create Account | Plenamente atendido | `api_create_account.feature` |
| Regra de negócio da API | Plenamente atendido | cenário de e-mail duplicado |
| Massa sem hardcode nos Steps | Plenamente atendido | `users.json` e Page Objects |
| Commands customizados | Plenamente atendido | `cypress/support/e2e.js` |
| Screenshots automáticos | Plenamente atendido | `cypress/evidencias` |
| Relatório Cucumber HTML | Plenamente atendido | `cucumber-report.html` |
| Relatório Cucumber JSON | Plenamente atendido | `cucumber-report.json` |
| Templates de evidência de API | Plenamente atendido | `scripts/templates` |
| Script de captura no Chrome | Plenamente atendido | `capture-chrome-window.ps1` |
| Script de evidências de API | Plenamente atendido | `capture-api-evidencias.mjs` |
| Script de geração/validação do relatório | Plenamente atendido | `generate-report.mjs` |
| Upload para Xray | Parcialmente atendido | Script implementado; execução depende de URL e token |
| Execução limpa da suíte | Plenamente atendido | 13 cenários aprovados |
| Parecer crítico de testabilidade | Plenamente atendido | Seção “Parecer técnico” |

---

## Melhorias futuras

Como evolução do projeto, poderiam ser implementados:

- exclusão automática dos usuários criados;
- execução paralela;
- pipeline de integração contínua;
- publicação automática do relatório como artefato;
- mascaramento adicional de dados sensíveis nos logs;
- tags para separar testes Web, API, smoke e regressão;
- execução em múltiplos navegadores;
- validação de acessibilidade;
- testes de contrato;
- testes de performance das APIs;
- upload real para Xray em ambiente configurado.

---

## Autoria

**Jussara Santos Gomes**

QA Engineer | Quality Assurance | Automação de Testes

Projeto desenvolvido para o desafio técnico da HCXpert.