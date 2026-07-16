import app from "./app.js";
import { prisma } from "./shared/prisma.js";

const PORT = process.env.PORT || 3000;

async function conexaoBanco() {
  await prisma.$connect();
  console.log("Banco conectado.");
  app.listen(PORT, () => {
    console.log(`Servidor rodando na porta: ${PORT}`);
  });
}

conexaoBanco().catch((err) => {
  console.log("Falha ao iniciar servidor: ", err);
  process.exit(1);
});
