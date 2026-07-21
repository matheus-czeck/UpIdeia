import AppError from "../shared/errors/app.error.js";

export type VotoDTO = {
  idUsuario: string;
  idIdeia: string;
};

export default class VotoEntity {
  idUsuario: string;
  idIdeia: string;

  constructor(data: VotoDTO) {
    if (!data.idIdeia) {
      throw new AppError("idIdeia vazio", 400);
    }
    if (!data.idUsuario) {
      throw new AppError("idUsuario vazio", 400);
    }
    this.idUsuario = data.idUsuario;
    this.idIdeia = data.idIdeia;
  }
}
