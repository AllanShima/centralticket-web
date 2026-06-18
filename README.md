# WEB-CENTRALTICKET
> Plataforma web do projeto em grupo que compõe a API do projeto final do semestre do Quinto Termo de Bacharel de Ciências da Computação. Projeto foi pensado pelos integrantes para ser desenvolvido em um curto período, contendo Endpoints simples que resolvem o que a plataforma do Front pede.
---
#### Curso: ARQUITETURA DE SOFTWARE E DESENVOLVIMENTO FULL STACK
#### Classe: 5º Termo - A, Bacharel em Ciências da Computação, UNIMAR
#### Docente: William Castro
#### Data e Prazo para o Desenvolvimento: 16/04/2026 - 11/06/2026

#### Integrantes e Responsabilidades do Grupo:
- Allan (Front-end, contexto de Autenticação do usuário) - github.com/AllanShima
- Guilherme Ryu (contexto de Profile) - github.com/Ryzoppi
- Hugo Facchini (contexto de Billing) - github.com/UInfinitu
- Renan (contexto de Events) - github.com/RenanHikaru

## Tabela de Conteúdo
- [Requisitos mínimos do Projeto](#requisitos-mínimos-do-projeto)
- [Preview](#preview)
- [Preview-site](#preview-site)
- [Escopo do Projeto](#escopo-do-projeto)
- [Tecnologias Principais](#tecnologias-principais)
- [Requisitos de Instalação](#requisitos-de-instalação)
- [Extesões e Bibliotecas](#extesões-e-bibliotecas)
- [Arquitetura e Organização](#arquitetura-e-organização)

## Requisitos mínimos do Projeto
> O que foi pedido pelo docente para a entrega do projeto
- Contexto 1: Eventos
- Contexto 2: Vendas
- Funcionalidades: cadastro de eventos e compra de ingressos.
- Regras: não vender acima da capacidade, impedir compra para eventos passados, validar status do pagamento.

## Preview

- Paymentpage
<img width="1919" height="870" alt="image" src="https://github.com/user-attachments/assets/e211b3f6-4d93-4c5c-ada0-ec288492afb7" />

- Homepage
<img width="1919" height="871" alt="image" src="https://github.com/user-attachments/assets/0d294c0e-ea1a-4723-8e8e-1f610db39a10" />

- Profilepage
<img width="1919" height="869" alt="image" src="https://github.com/user-attachments/assets/4b2cd042-0599-49f2-8b0d-89e919364675" />

### Preview-site
> Ainda falta mockar os dados

## Escopo do Projeto
> Escopo das telas para venda e gerenciamento de ingressos. Elaborado para o projeto "CentralTicket".
<img width="1352" height="661" alt="escopo_centralticket-web drawio" src="https://github.com/user-attachments/assets/8d04cc3e-edfa-4e42-9f19-f3c84d5be615" />

## Tecnologias Principais
- Bun;
- React;
- Tailwind;

## Requisitos de Instalação
> Projeto foi criado seguindo o seguinte template: bun-react-tailwind-shadcn-template

Para instalar as dependências

```bash
bun install
npm install
```

Para iniciar um ambiente de desenvolvimento

```bash
bun dev
npm run dev
```

Para produção

```bash
bun start
```

Esse projeto foi criado usando `bun init` em bun v1.3.10. [Bun](https://bun.com) é um runtime rápido tudo em um do JavaScript.

## Extesões e Bibliotecas
- bun install react-icons --save
- bun install react-router
- bun install @headlessui/react
- bun install react-hot-toast
- npm install --save-dev jsdoc
- bun install @tanstack/react-query
- bun install motion (Animations)
- bun install axios
- bun install jwt-decode

---

## Componentes e features do ShadCn
- bunx --bun shadcn@latest add sonner
- bunx --bun shadcn@latest add badge
- bunx --bun shadcn@latest add dialog
- bunx --bun shadcn@latest add field
- bunx --bun shadcn@latest add radio-group
- bunx --bun shadcn@latest add avatar

### Date
- bunx --bun shadcn@latest add popover
- bunx --bun shadcn@latest add calendar

---

## Arquitetura e Organização
> Pra organizar os componentes, hooks e fetch calls. Foi utilizado uma arquitetura simples que segue o padrão DDD com hexagonal da API

- Cada pasta representa o que faz:

src/

├── assets/          # arquivos estáticos (images, fonts)

├── config/          # Configurações do banco ou outros serviços externos

├── domain/          # Contém as interfaces de negócio do projeto

│   ├── entities/    # Define os objetos/entidades do negócio

│   ├── repositories/# Define como o sistema vai fazer fetch e o salvamento dos dados independente do tipo de banco

│   └── use-cases/   # Definindo ações específicas que o usuario pode fazer

├── hooks/           # Hooks Globais reutilizáveis (e.g., useLocalStorage)

├── services/        # Data-Layer

├── ui/              # Componentes genéricos do Tailwind (Buttons, Inputs, Modals)

└── utils/           # Qualquer função Helper (Date formatting, String parsing)

