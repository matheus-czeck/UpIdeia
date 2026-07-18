import IdeiaService from "./ideia.service.js";
import { Request, Response } from "express";

class IdeiaController {
  static async buscarIdeias(req: Request, res: Response) {
    const todasIdeias = await IdeiaService.buscarIdeias();
    res.status(200).json(todasIdeias);
  }

  static async criarNovaIdeia(req: Request, res: Response) {
    const { titulo, descricao } = req.body;
    const idUsuario = req.usuario!.id;

    const novaIdeia = await IdeiaService.criarNovaIdeia({
      titulo,
      descricao,
      idUsuario,
    });
    res.status(201).json(novaIdeia);
  }

  static async atualizarStatus(req: Request, res: Response) {
    const { status } = req.body;
    const id = req.params.id as string;

    const statusAtualizado = await IdeiaService.atualizarStatus(id, status);

    res.status(200).json(statusAtualizado);
  }
}

export default IdeiaController;
