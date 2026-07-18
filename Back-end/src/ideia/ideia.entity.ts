import { IdeiaStatus } from "../../generated/prisma/enums.js";

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
      throw new Error("Titulo e obrigatorio");
    }
    if (!data.descricao) {
      throw new Error("Descricao e obrigatorio");
    }

    this.titulo = data.titulo;
    this.descricao = data.descricao;
    this.idUsuario = data.idUsuario;
    this.status = "PENDENTE";
  }
}
