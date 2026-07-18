import { Request, Response } from "express";
import VotoService from "./voto.service.js";

class VotoController {
  static async registarVoto(req: Request, res: Response) {
    const idIdeia = req.params.idIdeia as string;
    const idUsuario = req.usuario!.id;

    const votoRegistrado = await VotoService.registrarVoto({
      idIdeia,
      idUsuario,
    });
    res.status(201).json(votoRegistrado);
  }
}

export default VotoController;
