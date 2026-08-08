import AppError from "../shared/errors/app.error.js";
import { prisma } from "../shared/prisma.js";
import { VotoDTO } from "./voto.entity.js";

class VotoService {
  static async registrarVoto(data: VotoDTO) {
    const ideia = await prisma.ideia.findUnique({
      where: { id: data.idIdeia },
    });
    if (ideia?.idUsuario === data.idUsuario) {
      throw new AppError("Voce nao pode votar na propria ideia!", 403);
    }

    const votoExiste = await prisma.voto.findUnique({
      where: {
        idUsuario_idIdeia: {
          idUsuario: data.idUsuario,
          idIdeia: data.idIdeia,
        },
      },
    });

    if (votoExiste) {
      throw new AppError("Voto ja registrado!", 409);
    }

    return await prisma.voto.create({ data });
  }

  static async buscarVotosPorUsuario(idUsuario: string) {
    const votos = await prisma.voto.findMany({
      where: { idUsuario },
      select: { idIdeia: true },
    });
    return votos.map((v) => v.idIdeia);
  }

  static async removerVoto(idUsuario: string, idIdeia: string) {
    const voto = await prisma.voto.findUnique({
      where: { idUsuario_idIdeia: { idUsuario, idIdeia } },
    });
    if (!voto) {
      throw new AppError('Voto nao encontrado', 404);
    }
    await prisma.voto.delete({ where: { id: voto.id } });
    return;
  }
}

export default VotoService;
