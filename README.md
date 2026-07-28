<div align="center">

# 🔌 Site Guia Eletrônica

**Guia didático de componentes eletrônicos para estudantes, hobbystas e técnicos — com calculadoras práticas e tradução multilíngue.**

[![Vite](https://img.shields.io/badge/Vite-6-646CFF?logo=vite&logoColor=white)](https://vitejs.dev/)
[![React](https://img.shields.io/badge/React-19-149ECA?logo=react&logoColor=white)](https://react.dev/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind%20CSS-4-06B6D4?logo=tailwindcss&logoColor=white)](https://tailwindcss.com/)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](LICENSE)
[![Status](https://img.shields.io/badge/status-em%20desenvolvimento-orange)](#roadmap)

[Demo](#) · [Reportar Bug](issues) · [Sugerir Feature](issues)

</div>

---

## 📖 Sobre o projeto

O **Site Guia Eletrônica** é uma plataforma educacional aberta sobre componentes eletrônicos. A ideia é simples: você escolhe o componente (resistor, capacitor, transistor, diodo, indutor…), vê a explicação didática **e ainda usa calculadoras** pra resolver problemas do dia a dia da bancada — tudo num só lugar.

Pensado pra três públicos:

- 🎓 **Estudantes** que estão começando em eletrônica
- 🛠️ **Hobbystas** que mexem com Arduino, ESP, robótica
- 🔧 **Técnicos** que precisam de uma referência rápida na bancada

### ✨ Features

- 🧩 **Catálogo de componentes** organizado por categorias
- 🧮 **Calculadoras rápidas** (Lei de Ohm, resistores, etc.)
- 🧠 **Calculadoras avançadas** (filtros RC/RL, divisor de tensão, etc.)
- 🌍 **Multilíngue** (PT-BR / EN, expansível)
- 🌗 **Tema claro e escuro** com persistência
- 📱 **Responsivo** — funciona bem no celular pra consultar na bancada
- ⚡ **Build rápido** com Vite + React 19

---

## 🛠️ Stack

| Camada       | Tecnologia                                                |
| ------------ | --------------------------------------------------------- |
| Build        | [Vite 6](https://vitejs.dev/)                             |
| UI           | [React 19](https://react.dev/)                            |
| Estilo       | [Tailwind CSS 4](https://tailwindcss.com/)                |
| Componentes  | [shadcn/ui](https://ui.shadcn.com/) (style: new-york)     |
| Ícones       | [Lucide React](https://lucide.dev/)                       |
| Animação     | [Framer Motion](https://www.framer.com/motion/)           |
| Roteamento   | [React Router 7](https://reactrouter.com/)                |
| Formulários  | React Hook Form + Zod                                     |
| Gráficos     | [Recharts](https://recharts.org/)                         |
| Package mgr  | [pnpm](https://pnpm.io/)                                  |

---

## 🚀 Como rodar localmente

Pré-requisitos: **Node.js 20+** e **pnpm 10+**.

```bash
# 1. Clone o repositório
git clone https://github.com/leddzeppellin/site-guia-eletronica.git
cd site-guia-eletronica

# 2. Instale as dependências
pnpm install

# 3. Rode o dev server
pnpm dev
# abre em http://localhost:5173

# 4. Build de produção
pnpm build

# 5. Preview do build
pnpm preview
```

### Outros scripts úteis

```bash
pnpm lint       # ESLint
```

---

## 📁 Estrutura do projeto

```
site-guia-eletronica/
├── public/                  # assets estáticos (favicon, etc.)
├── src/
│   ├── assets/              # imagens, SVGs
│   ├── components/          # componentes da UI
│   │   └── ui/              # primitivos do shadcn
│   ├── hooks/               # custom hooks React
│   ├── lib/                 # utilitários
│   ├── App.jsx              # raiz da aplicação
│   ├── App.css              # tema Tailwind + variáveis CSS
│   ├── main.jsx             # entry point
│   └── index.css            # imports globais
├── components.json          # config do shadcn/ui
├── eslint.config.js
├── index.html
├── jsconfig.json            # path alias @/
├── package.json
├── vite.config.js
└── README.md
```

---

## 🤝 Como contribuir

Contribuições são muito bem-vindas! Tem várias formas de ajudar:

- 🐛 **Reportar bug** — abre uma issue com passos pra reproduzir
- 💡 **Sugerir feature** — abre uma issue descrevendo o caso de uso
- 📝 **Melhorar conteúdo** — corrigir/explicação de algum componente
- 🧮 **Nova calculadora** — manda PR com a lógica + UI
- 🌍 **Tradução** — adicionar novo idioma via LanguageProvider
- 🎨 **UI/UX** — ajustes visuais, acessibilidade, responsividade

### Fluxo

1. Fork o projeto
2. Crie uma branch (`git checkout -b feature/minha-feature`)
3. Commit suas mudanças (`git commit -m 'feat: minha feature'`)
4. Push pra branch (`git push origin feature/minha-feature`)
5. Abre um Pull Request

---

## 🗺️ Roadmap

- [ ] Páginas individuais por componente (Resistor, Capacitor, Transistor…)
- [ ] Busca global de componentes
- [ ] Filtro por categoria
- [ ] Mais calculadoras (555 timer, filtros, conversores A/D)
- [ ] PWA (instalar no celular)
- [ ] Modo offline
- [ ] Painel admin pra adicionar componentes via UI
- [ ] Banco de questões / quiz
- [ ] Vídeos embutidos

Tem algo que você quer ver? Abre uma issue! 🚀

---

## 📄 Licença

Distribuído sob a licença **MIT**. Veja [`LICENSE`](LICENSE) pra mais detalhes.

---

## 👤 Autor

Feito com ☕ por **Lucas (Led Zeppelin)** — técnico em eletrônica e desenvolvedor em Anastácio/MS, Brasil.

- GitHub: [@leddzeppellin](https://github.com/leddzeppellin)
- Outros projetos: [genius-windows-toolkit](https://github.com/leddzeppellin/genius-windows-toolkit) · [CapBatCalc](https://github.com/leddzeppellin/CapBatCalc)

---

<div align="center">

Se esse projeto te ajudou, deixa uma ⭐ — ajuda muito!

</div>
