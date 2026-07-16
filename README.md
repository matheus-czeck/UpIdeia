<<<<<<< HEAD
# UpIdeia
Micro-SaaS de painel de sugestões com sistema de upvotes. Usuários podem submeter ideias de melhoria, votar nas ideias de outros e acompanhar o status de cada sugestão. Administradores gerenciam o fluxo das ideias pelo painel administrativo.
=======
# UpIdeia 💡

Micro-SaaS de painel de sugestões com sistema de upvotes. Usuários podem submeter ideias de melhoria, votar nas ideias de outros e acompanhar o status de cada sugestão. Administradores gerenciam o fluxo das ideias pelo painel administrativo.

> Projeto desenvolvido como exercício de arquitetura robusta, aplicando DDD, TDD, Entities e autenticação com Supabase.

---

## Tecnologias

| Camada | Tecnologia |
|---|---|
| Backend | Node.js + Express + TypeScript |
| ORM | Prisma |
| Banco de dados | PostgreSQL via Supabase |
| Autenticação | Supabase Auth |
| Frontend | Angular 17 + PrimeNG |
| Testes | Vitest |
| Deploy backend | Railway |
| Deploy frontend | Netlify |

---

## Arquitetura

O projeto segue os princípios de **Domain Driven Design (DDD)**, organizando o código por domínio de negócio em vez de camada técnica.

### Estrutura de pastas

```
src/
├── idea/
│   ├── idea.controller.ts
│   ├── idea.service.ts
│   ├── idea.entity.ts
│   ├── idea.routes.ts
│   └── idea.test.ts
├── vote/
│   ├── vote.controller.ts
│   ├── vote.service.ts
│   ├── vote.entity.ts
│   ├── vote.routes.ts
│   └── vote.test.ts
├── user/
│   ├── user.controller.ts
│   ├── user.service.ts
│   ├── user.entity.ts
│   ├── user.routes.ts
│   └── user.test.ts
└── shared/
    ├── errors/
    │   └── AppError.ts
    └── middlewares/
        ├── auth.middleware.ts
        └── admin.middleware.ts
```

### Padrões utilizados

- **Entity** — cada domínio tem uma classe Entity que encapsula validações e regras de negócio
- **DTO** — types TypeScript que definem o contrato dos dados que chegam via requisição
- **TDD** — testes escritos antes dos services (red → green → refactor)
- **Middleware de autorização** — `authMiddleware` para rotas autenticadas, `adminMiddleware` para rotas exclusivas do admin

---

## Entidades e Relações

```
User  ||--o{  Idea  : "cria"
User  ||--o{  Vote  : "dá"
Idea  ||--o{  Vote  : "recebe"
```

### User

| Campo | Tipo | Descrição |
|---|---|---|
| id | String (UUID) | ID espelho do Supabase Auth |
| email | String | E-mail do usuário |
| name | String | Nome do usuário |
| role | Enum | `USER` ou `ADMIN` |
| createdAt | DateTime | Data de criação |

> O `id` da tabela User é o mesmo gerado pelo Supabase Auth. Ao criar conta, o usuário é inserido simultaneamente no Supabase Auth e na tabela User do Prisma.

### Idea

| Campo | Tipo | Descrição |
|---|---|---|
| id | String (UUID) | Identificador único |
| title | String | Título da ideia |
| description | String | Descrição detalhada |
| status | Enum | Status atual da ideia |
| userId | String (FK) | Autor da ideia |
| createdAt | DateTime | Data de criação |

**Status possíveis:**

| Status | Descrição |
|---|---|
| `PENDING` | Recém criada, aguardando análise (valor padrão) |
| `IN_REVIEW` | Em análise pelo admin |
| `DEVELOPED` | Implementada |
| `REJECTED` | Recusada |

> Toda ideia nasce com status `PENDING` — definido automaticamente pela Entity. Apenas o admin pode alterar o status.

### Vote

| Campo | Tipo | Descrição |
|---|---|---|
| id | String (UUID) | Identificador único |
| userId | String (FK) | Usuário que votou |
| ideaId | String (FK) | Ideia que recebeu o voto |
| createdAt | DateTime | Data do voto |

> **Regra crítica:** a combinação `userId + ideaId` é única. Um usuário pode votar em N ideias diferentes, mas nunca duas vezes na mesma ideia. Garantido por constraint `@@unique([userId, ideaId])` no banco.

---

## Rotas da API

### Autenticação (`/auth`)

| Método | Rota | Acesso | Descrição |
|---|---|---|---|
| POST | `/auth/register` | Público | Cria conta e insere User espelho |
| POST | `/auth/login` | Público | Autentica e retorna JWT |

### Ideias (`/ideas`)

| Método | Rota | Acesso | Descrição |
|---|---|---|---|
| GET | `/ideas` | Público | Lista ideias ordenadas por votos |
| POST | `/ideas` | Usuário logado | Cria nova ideia |
| PATCH | `/ideas/:id/status` | Admin | Atualiza status da ideia |

### Votos (`/votes`)

| Método | Rota | Acesso | Descrição |
|---|---|---|---|
| POST | `/votes/:ideaId` | Usuário logado | Vota em uma ideia |
| DELETE | `/votes/:ideaId` | Usuário logado | Remove voto de uma ideia |

---

## Regras de Negócio

- Toda ideia criada nasce com status `PENDING` automaticamente
- Um usuário não pode votar na própria ideia
- Um usuário não pode votar duas vezes na mesma ideia
- Somente o admin pode alterar o status de uma ideia
- A listagem de ideias é sempre ordenada pelo número de votos (maior primeiro)
- O campo `role` do usuário é definido como `USER` no cadastro; `ADMIN` é atribuído manualmente

---

## Ordem de Desenvolvimento (TDD)

```
1. schema.prisma         → models, enums, relações e constraints
2. UserEntity            → testes → implementação
3. UserService           → testes → implementação
4. IdeaEntity            → testes → implementação
5. IdeaService           → testes → implementação
6. VoteEntity            → testes → implementação
7. VoteService           → testes → implementação
8. Controllers e rotas   → integração das camadas
9. Middlewares           → auth e admin
10. Frontend Angular     → interfaces de usuário e admin
11. Deploy               → Railway + Netlify + subdomínio
```

---

## Deploy

| Serviço | Plataforma | URL |
|---|---|---|
| Frontend | Netlify | `upideia.matheushcz.dev` |
| Backend | Railway | — |
| Banco | Supabase | — |

---

## Como rodar localmente

```bash
# Clonar o repositório
git clone https://github.com/matheus-czeck/upideia

# Instalar dependências do backend
cd backend
npm install

# Configurar variáveis de ambiente
cp .env.example .env

# Rodar migrations
npx prisma migrate dev

# Iniciar servidor
npm run dev

# Rodar testes
npm run test
```

---

## Variáveis de Ambiente

```env
DATABASE_URL=
DIRECT_URL=
SUPABASE_URL=
SUPABASE_ANON_KEY=
SUPABASE_SERVICE_ROLE_KEY=
JWT_SECRET=
ALLOWED_ORIGINS=
```
>>>>>>> 8a098e7 (feat: entidades com testes (Usuarios, Ideia, voto))
