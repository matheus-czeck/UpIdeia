type IdeiaDTO = {
  id: string;
  titulo: string;
  descricao: string;
  idUsuario: string;
};

export default class IdeiaEntity {
  id: string;
  titulo: string;
  descricao: string;
  status: string;
  idUsuario: string;

  constructor(data: IdeiaDTO) {
    if (!data.titulo) {
      throw new Error("Titulo e obrigatorio");
    }
    if (!data.descricao) {
      throw new Error("Descricao e obrigatorio");
    }

    this.id = data.id;
    this.titulo = data.titulo;
    this.descricao = data.descricao;
    this.idUsuario = data.idUsuario;
    this.status = "PENDENTE";
  }
}
