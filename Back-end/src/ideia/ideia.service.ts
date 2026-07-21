import { IdeiaStatus } from "../../generated/prisma/enums.js";
import AppError from "../shared/errors/app.error.js";
import { prisma } from "../shared/prisma.js";
import IdeiaEntity, { IdeiaDTO } from "./ideia.entity.js";

class IdeiaService {
  static async buscarIdeias() {
    return await prisma.ideia.findMany({
      include: {
        _count: {
          select: {votos: true}
        }
      },
      orderBy: {
        votos: {
          _count: 'desc'
        }
      }
    });
  }

  static async criarNovaIdeia(data: IdeiaDTO) {
    const novaIdeia = new IdeiaEntity(data);
    return await prisma.ideia.create({ data: novaIdeia });
  }

  static async atualizarStatus(id: string, status: IdeiaStatus) {
    const ideia = await prisma.ideia.findUnique({
      where: { id },
    });

    if (!ideia) throw new AppError("Ideia nao encontrada.", 404);

    const ideiaAtualizada = await prisma.ideia.update({
      where: {
        id: ideia.id,
      },
      data: {
        status: status,
      },
    });

    return ideiaAtualizada;
  }
}

export default IdeiaService;
