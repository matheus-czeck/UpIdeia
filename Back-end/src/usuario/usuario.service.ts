import UsuarioEntity, { UsuarioDTO } from "./usuario.entity.js";
import { prisma } from "../shared/prisma.js";
import AppError from "../shared/errors/app.error.js";

class UsuarioService {
  static async criar(data: UsuarioDTO) {
    const usuario = new UsuarioEntity(data);
    return await prisma.usuario.create({ data: usuario });
  }

  static async buscarPorId(id: string) {
    const usuario = await prisma.usuario.findUnique({ where: { id } });
    if (!usuario) throw new AppError("Usuario nao encontrado!", 404);

    return usuario;
  }
}

export default UsuarioService;
