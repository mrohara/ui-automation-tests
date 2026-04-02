# 🧪 UI Test Automation

Projeto de automação de testes de UI.

---

## 🎯 Objetivo

Validar de forma estável e confiável o comportamento da pesquisa de artigos do blog, cobrindo cenários essenciais de busca e garantindo que o sistema responda corretamente a entradas válidas e inválidas.

O projeto foi desenvolvido com foco em:

* simplicidade
* legibilidade
* estabilidade dos testes
* facilidade de execução
* escabalibidade
---

## 🧰 Stack utilizada

* [Playwright](https://playwright.dev/)
* TypeScript
* Node.js

---

## 📁 Estrutura do projeto

```text
src/
  config/
    env.ts
    environments/
      prod.env.ts
      dev.env.ts
      test.env.ts
    test-data/
      prod.data.ts
      dev.data.ts
      test.data.ts
  pages/
    home.page.ts
    page-manager.ts
    search-results.page.ts

tests/
  blog-home.spec.ts
```

---

## 🧠 Arquitetura e boas práticas

O projeto segue princípios de automação modernos:

### ✔ Page Object Model (POM)

Separação clara entre:

* ações (pages)
* validações (tests)

### ✔ Page Manager

Centraliza a criação das pages, evitando repetição no teste.

### ✔ Separação de ambiente e dados

* `env`: configuração de ambiente (URLs, serviços)
* `test-data`: massa de dados desacoplada

### ✔ Assertions fora das pages

* Pages focadas em ações e queries
* Testes responsáveis pelas validações

### ✔ Simplicidade intencional

Evita complexidade desnecessária, priorizando:

* manutenção
* clareza
* estabilidade

---

## 🧪 Cenários automatizados

### 1. Home - Smoke Test

Valida que:

* a página inicial carrega corretamente
* o componente de busca está visível

---

### 2. Busca com termo válido

Valida que:

* a requisição retorna sucesso
* a página de resultados é exibida
* existe ao menos um resultado retornado

---

### 3. Busca com termo inválido

Valida que:

* a requisição retorna sucesso
* não existem resultados
* é exibida mensagem adequada ao usuário informando que nada foi encontrado

---

## ⚠️ Observações importantes (Teste exploratório)

Durante a análise exploratória foram identificados alguns comportamentos relevantes:

### 🔎 1. Instabilidade no componente de busca (UI)

* Em alguns casos, o campo de busca colapsável não se comporta de forma consistente após refresh
* Para garantir estabilidade, a automação utiliza diretamente a query string (`?s=`)

---

### 🔎 2. Comportamento inconsistente com termos acentuados

* Termos com acento (ex: "crédito") podem apresentar comportamento inconsistente
* Possível duplicação ou renderização incorreta de conteúdo ao realizar scroll

👉 Esse comportamento foi identificado, mas não automatizado, pois não é determinístico

---

### 🔎 3. Delay na renderização de resultados

* A UI pode apresentar atraso visual na exibição dos artigos
* Os testes foram ajustados para validar o estado funcional ao invés do estado visual completo

---

## 🚀 Pré-requisitos

* Node.js 18 ou superior
* npm

---

## 📦 Instalação

```bash
npm install
npx playwright install
```

---

## ▶️ Execução dos testes

### Execução padrão

Foram criados alguns scripts para facilitar execução, levando em consideração apenas ambiente de prod e devidas finalizades.

```bash
Execução no chrome:
    npm run test:prod:chrome
Execução no firefox:
    npm run test:prod:firefox
Execução no webkit:
    npm run test:prod:webkit
Execução Smoke suíte:
    npm run test:prod:smoke
```

---

### Execução com navegador visível

```bash
ENV=prod npx playwright test --headed
```

---

### Execução em modo debug

```bash
ENV=prod npx playwright test --debug
```

---

## 📊 Relatório

Após execução:

```bash
npm run report
```

---

## 📌 Decisões técnicas

### Por que não utilizar o fluxo de clique na lupa?

* O componente apresentou instabilidade durante testes exploratórios
* A automação priorizou confiabilidade e consistência
* A validação funcional da busca foi mantida via query string

---

### Por que não validar conteúdo exato dos resultados?

* A busca não garante correspondência direta no título dos artigos
* Evita falso negativo e fragilidade no teste

---

### Por que não automatizar o bug de acentuação?

* Comportamento não determinístico
* Melhor tratado como achado exploratório do que como teste automatizado

---

## 🔮 Possíveis evoluções

* Suporte a múltiplos ambientes
* Uso de `data-testid` para maior estabilidade
* Testes visuais (snapshot)
* Cobertura do fluxo completo da UI após estabilização do componente