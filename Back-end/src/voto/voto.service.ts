import { prisma } from "../shared/prisma.js";
import { VotoDTO } from "./voto.entity.js";

class VotoService {
  static async registrarVoto(data: VotoDTO) {
    const ideia = await prisma.ideia.findUnique({
      where: { id: data.idIdeia },
    });
    if (ideia?.idUsuario === data.idUsuario) {
      throw new Error("Voce nao pode votar na propria ideia!");
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
      throw new Error("Voto ja registrado!");
    }

    return await prisma.voto.create({ data });
  }
}

export default VotoService;
