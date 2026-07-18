
import UsuarioEntity from "./usuario.entity.js";
import { prisma } from "../shared/prisma.js";

class UsuarioService {
  static async criar(data: UsuarioEntity) {
    const usuario = new UsuarioEntity(data);
    return await prisma.usuario.create({ data: usuario });
  }

  static async buscarPorId(id: string) {
    const usuario = await prisma.usuario.findUnique({ where: { id } });
    if (!usuario) throw new Error("Usuario nao encontrado!");

    return usuario;
  }
}

export default UsuarioService;
