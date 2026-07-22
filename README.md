<div align="center">

<h1>💡 UpIdeia</h1>

<p>Micro-SaaS de sugestões com upvotes, usuários propõem melhorias, a comunidade vota, e um administrador decide o que sai do papel.</p>

![Status](https://img.shields.io/badge/status-finalizado-brightgreen?style=flat-square)
![TypeScript](https://img.shields.io/badge/TypeScript-5.x-3178C6?style=flat-square&logo=typescript&logoColor=white)
![Angular](https://img.shields.io/badge/Angular-17+-DD0031?style=flat-square&logo=angular&logoColor=white)
![Node.js](https://img.shields.io/badge/Node.js-22+-339933?style=flat-square&logo=nodedotjs&logoColor=white)
![Supabase](https://img.shields.io/badge/Supabase-3ECF8E?style=flat-square&logo=supabase&logoColor=white)

</div>

---

## 📖 Sobre o projeto

O **UpIdeia** nasceu como um exercício proposto pelo meu mentor: construir um Micro-SaaS completo, do banco de dados ao deploy, aplicando conceitos mais avançados de arquitetura. A proposta é simples de entender, usuários sugerem melhorias, outros usuários votam, e um administrador decide o que será desenvolvido. Mas rica o suficiente para praticar Domain-Driven Design, TDD e autenticação real com Supabase Auth.

Por ser propositalmente genérico (sem um contexto fixo de "melhorias de quê"), o UpIdeia foi pensado para ser reaproveitado futuramente em outros contextos, como um espaço de sugestões dentro do próprio portfólio.

> Projeto desenvolvido para praticar arquitetura orientada a domínio (DDD), TDD, autenticação real com Supabase e deploy completo com pipeline de CI.

---

## ✨ Funcionalidades

- [x] Cadastro e login de usuários via Supabase Auth
- [x] Envio de sugestões de melhoria pelos usuários autenticados
- [x] Sistema de upvote, um voto por usuário em cada ideia
- [x] Bloqueio de voto duplicado e de voto na própria ideia
- [x] Painel administrativo para atualizar o status das ideias
- [x] Listagem pública ordenada pelas ideias mais votadas
- [x] Testes automatizados (TDD) para entidades e serviços
- [x] Pipeline de CI com GitHub Actions

---

## 🛠️ Tecnologias

**Back-end**

- [Node.js](https://nodejs.org/) — ambiente de execução JavaScript
- [TypeScript](https://www.typescriptlang.org/) — superset com tipagem estática
- [Express](https://expressjs.com/) — framework web para construção da API
- [Prisma ORM](https://www.prisma.io/) — mapeamento objeto-relacional (ORM)
- [Supabase JS Client](https://supabase.com/docs/reference/javascript) — autenticação de usuários (Supabase Auth)
- [Vitest](https://vitest.dev/) — testes unitários seguindo TDD

**Front-end**

- [Angular 17](https://angular.io/) — framework SPA para a interface
- [PrimeNG](https://primeng.org/) — biblioteca de componentes de UI de alta performance
- [PrimeIcons](https://primeng.org/icons) — conjunto oficial de ícones do ecossistema Prime
- [PrimeFlex](https://primeflex.org/) — utilitários de layout (flexbox e grid)

**Banco de Dados & Infraestrutura**

- [Supabase](https://supabase.com/) — PostgreSQL gerenciado + Auth como serviço
- [Railway](https://railway.app/) — hospedagem do back-end
- [Netlify](https://www.netlify.com/) — hospedagem do front-end
- [GitHub Actions](https://github.com/features/actions) — pipeline de CI (testes e build a cada push)
- [Git](https://git-scm.com/) / [GitHub](https://github.com/) — controle de versão e hospedagem do código

---

## 🏗️ Arquitetura

Organizado por **domínio (DDD)** em vez de camada técnica, cada pasta concentra tudo sobre aquele assunto (entity, service, controller e rotas).

```
UpIdeia/
├── Back-end/
│   ├── src/
│   │   ├── usuario/         # Domínio de usuário: entity, service, controller, rotas e testes
│   │   ├── ideia/           # Domínio de ideia: entity, service, controller, rotas e testes
│   │   ├── voto/            # Domínio de voto: entity, service, controller e rotas
│   │   ├── shared/          # Código transversal aos domínios
│   │   │   ├── errors/      # AppError e o middleware global de tratamento de erros
│   │   │   ├── middlewares/ # authMiddleware e adminMiddleware
│   │   │   ├── supabase.ts  # Cliente do Supabase Auth
│   │   │   └── prisma.ts    # Instância do Prisma Client
│   │   ├── app.ts           # Configuração do Express e das rotas
│   │   └── server.ts        # Conexão com o banco e inicialização do servidor
│   │
│   ├── prisma/
│   │   ├── migrations/      # Versionamento estrutural do banco de dados
│   │   ├── seed.ts          # Script de seed com dados de demonstração
│   │   └── schema.prisma    # Definição das tabelas de Usuario, Ideia e Voto
│   │
│   └── package.json
│
└── Front-end/
    ├── src/
    │   └── app/
    │       ├── core/         # Infraestrutura: AuthService, guards e interceptor
    │       ├── usuario/      # Telas de login e cadastro
    │       ├── ideia/        # Service, listagem, criação de ideia e painel admin
    │       └── voto/         # Service de votação
    │
    └── package.json
```

---

## 🚀 Como rodar localmente

### Pré-requisitos

- Node.js 22+
- Conta no [Supabase](https://supabase.com/) (banco de dados e autenticação)
- npm

### Configuração

```bash
# 1. Clone o repositório
git clone https://github.com/matheus-czeck/UpIdeia.git
cd UpIdeia
```
```bash
cd Back-end
```
```bash
# Instale as dependências
npm install
```
```bash
# Configure as variáveis de ambiente
cp .env.example .env

# Edite o .env com as credenciais do seu projeto Supabase:
# DATABASE_URL=" "
# DIRECT_URL=" "
# SUPABASE_URL=" "
# SUPABASE_ANON_KEY=""
# SUPABASE_SERVICE_ROLE_KEY=""
# PORT=3000
# ALLOWED_ORIGINS="http://localhost:4200"
```
```bash
# Execute as migrations para estruturar o banco
npx prisma migrate dev
```
```bash
# (Opcional) Popule o banco com dados de demonstração
npx prisma db seed
```
```bash
# Inicie o servidor de desenvolvimento
npm run dev
```

Front-end
```bash
cd ../Front-end
```
```bash
# Instale as dependências
npm install
```
```bash
# Inicie a aplicação Angular
npm start
```

Abra seu navegador em http://localhost:4200.

---

## 🗄️ Modelo de dados

```prisma
enum regraUsuario {
  ADMIN
  USUARIO
}

enum IdeiaStatus {
  PENDENTE
  ANALISE
  DESENVOLVIMENTO
  REJEITADA
}

model Usuario {
  id        String       @id
  email     String       @unique
  nome      String
  regra     regraUsuario @default(USUARIO)
  createdAt DateTime     @default(now())

  ideias    Ideia[]
  votos     Voto[]
}

model Ideia {
  id          String      @id @default(cuid())
  titulo      String
  descricao   String
  status      IdeiaStatus @default(PENDENTE)
  idUsuario   String
  createdAt   DateTime    @default(now())

  usuario     Usuario     @relation(fields: [idUsuario], references: [id])
  votos       Voto[]
}

model Voto {
  id        String   @id @default(cuid())
  idUsuario String
  idIdeia   String
  createdAt DateTime @default(now())

  usuario   Usuario  @relation(fields: [idUsuario], references: [id])
  ideia     Ideia    @relation(fields: [idIdeia], references: [id])

  @@unique([idUsuario, idIdeia])
}
```

---

## 👨‍💻 Autor

**Matheus Henrique Czeck**
Estudante de Engenharia de Software · Dev Web Full Stack 

[![LinkedIn](https://img.shields.io/badge/LinkedIn-matheus--hcz-0A66C2?style=flat-square&logo=linkedin&logoColor=white)](https://www.linkedin.com/in/matheus-hcz/)
[![GitHub](https://img.shields.io/badge/GitHub-matheus--czeck-181717?style=flat-square&logo=github&logoColor=white)](https://github.com/matheus-czeck)
