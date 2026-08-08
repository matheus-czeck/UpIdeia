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

  static async buscarMeusVotos(req: Request, res: Response) {
    const idUsuario = req.usuario!.id;
    const ids = await VotoService.buscarVotosPorUsuario(idUsuario);
    res.status(200).json({ ids });
  }

  static async removerVoto(req: Request, res: Response) {
    const idIdeia = req.params.idIdeia as string;
    const idUsuario = req.usuario!.id;
    await VotoService.removerVoto(idUsuario, idIdeia);
    res.status(204).send();
  }
}

export default VotoController;
