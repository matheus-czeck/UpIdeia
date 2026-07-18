export type VotoDTO = {
  idUsuario: string;
  idIdeia: string;
};

export default class VotoEntity {
  idUsuario: string;
  idIdeia: string;

  constructor(data: VotoDTO) {
    if (!data.idIdeia) {
      throw new Error("idIdeia vazio");
    }
    if (!data.idUsuario) {
      throw new Error("idUsuario vazio");
    }
    this.idUsuario = data.idUsuario;
    this.idIdeia = data.idIdeia;
  }
}
