### Escopo do Projeto

<img width="1352" height="661" alt="escopo_centralticket-web drawio" src="https://github.com/user-attachments/assets/8d04cc3e-edfa-4e42-9f19-f3c84d5be615" />

---

# bun-react-tailwind-shadcn-template

To install dependencies:

```bash
bun install
```

To start a development server:

```bash
bun dev
```

To run for production:

```bash
bun start
```

This project was created using `bun init` in bun v1.3.10. [Bun](https://bun.com) is a fast all-in-one JavaScript runtime.

---

#### Extesões e Bibliotecas
- bun install react-icons --save
- bun install react-router
- bun install @headlessui/react
- bun install react-hot-toast
- npm install --save-dev jsdoc
- bun install @tanstack/react-query
- bun install motion (Animations)
---

#### Componentes e features do ShadCn
- bunx --bun shadcn@latest add sonner
- bunx --bun shadcn@latest add badge
- bunx --bun shadcn@latest add dialog
- bunx --bun shadcn@latest add field
- bunx --bun shadcn@latest add radio-group
- bunx --bun shadcn@latest add avatar

##### Date
- bunx --bun shadcn@latest add popover
- bunx --bun shadcn@latest add calendar
---

#### Arquitetura utilizada
Pra organizar os componentes, hooks e fetch calls. Foi utilizado uma Arquitetura Simples com DDD
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
