import { Request, Response } from "express";
import { supabase } from "../shared/supabase.js";
import UsuarioService from "./usuario.service.js";
import AppError from "../shared/errors/app.error.js";

class UsuarioController {
  static async criar(req: Request, res: Response) {
    const { nome, email, password } = req.body;
    const { data, error } = await supabase.auth.signUp({ email, password });

    if (error || !data.user) {
      throw new AppError(error?.message ?? "Erro ao criar usuario", 400);
    }
    const novoUsuario = await UsuarioService.criar({
      id: data.user!.id,
      nome,
      email,
    });

    res.status(201).json(novoUsuario);
  }

  static async entrar(req: Request, res: Response) {
    const { email, password } = req.body;
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });
    if (error || !data.session) {
      throw new AppError("Email ou senha invalidos", 401);
    }

    const usuario = await UsuarioService.buscarPorId(data.user.id);

    res.status(200).json({
      token: data.session.access_token,
      regra: usuario.regra,
    });
  }
}

export default UsuarioController;
