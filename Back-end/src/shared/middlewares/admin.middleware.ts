import { Request, Response, NextFunction } from "express";
import UsuarioService from "../../usuario/usuario.service.js";

class AdminMiddleware {
  static async verificarAdmin(req: Request, res: Response, next: NextFunction) {
    const usuario = await UsuarioService.buscarPorId(req.usuario!.id);
    if (usuario.regra !== "ADMIN") {
      return res
        .status(403)
        .json({ error: "Acesso restrito a administradores" });
    }
    next()
  }
}

export default AdminMiddleware;
