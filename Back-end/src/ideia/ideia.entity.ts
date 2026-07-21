import { IdeiaStatus } from "../../generated/prisma/enums.js";
import AppError from "../shared/errors/app.error.js";

export type IdeiaDTO = {
  titulo: string;
  descricao: string;
  idUsuario: string;
};

export default class IdeiaEntity {
  titulo: string;
  descricao: string;
  status: IdeiaStatus;
  idUsuario: string;

  constructor(data: IdeiaDTO) {
    if (!data.titulo) {
      throw new AppError("Titulo e obrigatorio", 400);
    }
    if (!data.descricao) {
      throw new AppError("Descricao e obrigatorio", 400);
    }

    this.titulo = data.titulo;
    this.descricao = data.descricao;
    this.idUsuario = data.idUsuario;
    this.status = "PENDENTE";
  }
}
