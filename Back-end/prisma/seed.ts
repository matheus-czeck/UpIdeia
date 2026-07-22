import "dotenv/config";
import { randomUUID } from "node:crypto";
import { prisma } from "../src/shared/prisma.js";
import { IdeiaStatus } from "../generated/prisma/enums.js";

const usuariosSeed = [
  { email: "ana.ribeiro@upideia.dev", nome: "Ana Ribeiro" },
  { email: "bruno.alves@upideia.dev", nome: "Bruno Alves" },
  { email: "carla.mendes@upideia.dev", nome: "Carla Mendes" },
  { email: "diego.souza@upideia.dev", nome: "Diego Souza" },
  { email: "elisa.tanaka@upideia.dev", nome: "Elisa Tanaka" },
];

const ideiasSeed = [
  {
    titulo: "Modo escuro no painel",
    descricao: "Reduzir o cansaço visual em sessões longas, principalmente à noite.",
    status: "DESENVOLVIMENTO" as IdeiaStatus,
  },
  {
    titulo: "Notificação por email quando o status muda",
    descricao: "Avisar automaticamente quem sugeriu a ideia assim que o admin atualizar o status.",
    status: "ANALISE" as IdeiaStatus,
  },
  {
    titulo: "Exportar ideias em PDF",
    descricao: "Gerar um relatório com todas as ideias e seus status para reuniões.",
    status: "PENDENTE" as IdeiaStatus,
  },
  {
    titulo: "Filtro por status na listagem",
    descricao: "Permitir ver só as ideias em desenvolvimento ou só as pendentes.",
    status: "PENDENTE" as IdeiaStatus,
  },
  {
    titulo: "Comentários nas ideias",
    descricao: "Deixar outros usuários discutirem detalhes antes do admin decidir.",
    status: "ANALISE" as IdeiaStatus,
  },
  {
    titulo: "Integração com Slack",
    descricao: "Enviar um aviso no canal da equipe sempre que uma ideia for aprovada.",
    status: "PENDENTE" as IdeiaStatus,
  },
  {
    titulo: "Anexar imagens nas sugestões",
    descricao: "Permitir print de tela para ilustrar a melhoria proposta.",
    status: "REJEITADA" as IdeiaStatus,
  },
  {
    titulo: "Busca por palavra-chave",
    descricao: "Encontrar rapidamente ideias parecidas antes de criar uma nova.",
    status: "DESENVOLVIMENTO" as IdeiaStatus,
  },
  {
    titulo: "Categorias para organizar sugestões",
    descricao: "Agrupar ideias por área: Financeiro, RH, Produto, Infraestrutura.",
    status: "PENDENTE" as IdeiaStatus,
  },
  {
    titulo: "Ranking mensal das mais votadas",
    descricao: "Destacar as ideias com mais engajamento em um resumo mensal.",
    status: "ANALISE" as IdeiaStatus,
  },
];

const votosPorIdeia: Record<number, number> = {
  0: 4,
  7: 3,
  1: 3,
  4: 2,
  9: 2,
  2: 1,
  5: 1,
  3: 0,
  6: 0,
  8: 0,
};

async function main() {
  console.log("Criando usuarios de seed...");

  const usuarios = [];
  for (const dados of usuariosSeed) {
    const usuario = await prisma.usuario.upsert({
      where: { email: dados.email },
      update: {},
      create: {
        id: randomUUID(),
        nome: dados.nome,
        email: dados.email,
        regra: "USUARIO",
      },
    });
    usuarios.push(usuario);
  }

  const idsUsuariosSeed = usuarios.map((u) => u.id);

  console.log("Limpando ideias/votos anteriores do seed...");

  const ideiasAntigas = await prisma.ideia.findMany({
    where: { idUsuario: { in: idsUsuariosSeed } },
    select: { id: true },
  });
  const idsIdeiasAntigas = ideiasAntigas.map((i) => i.id);

  await prisma.voto.deleteMany({ where: { idIdeia: { in: idsIdeiasAntigas } } });
  await prisma.ideia.deleteMany({ where: { idUsuario: { in: idsUsuariosSeed } } });

  console.log("Criando ideias de seed...");

  const ideias = [];
  for (let i = 0; i < ideiasSeed.length; i++) {
    const dados = ideiasSeed[i];
    const autor = usuarios[i % usuarios.length];

    const ideia = await prisma.ideia.create({
      data: {
        titulo: dados.titulo,
        descricao: dados.descricao,
        status: dados.status,
        idUsuario: autor.id,
      },
    });
    ideias.push(ideia);
  }

  console.log("Criando votos de seed...");

  for (const [indexStr, quantidade] of Object.entries(votosPorIdeia)) {
    const index = Number(indexStr);
    const ideia = ideias[index];

    const votantesPossiveis = usuarios.filter((u) => u.id !== ideia.idUsuario);
    const votantes = votantesPossiveis.slice(0, quantidade);

    for (const votante of votantes) {
      await prisma.voto.create({
        data: {
          idUsuario: votante.id,
          idIdeia: ideia.id,
        },
      });
    }
  }

  console.log(`Seed concluido: ${usuarios.length} usuarios, ${ideias.length} ideias.`);
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });