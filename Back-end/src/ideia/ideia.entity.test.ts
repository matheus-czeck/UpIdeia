import IdeiaEntity from "./ideia.entity.js";

describe("IdeiaEntity", () => {
  it("Deve lancar erro para titulo vazio", () => {
    expect(
      () =>
        new IdeiaEntity({
          idUsuario: "usuario1",
          titulo: "",
          descricao: "descricao da nova ideia",
        }),
    ).toThrow("Titulo e obrigatorio");
  });

  it("Deve lancar erro para descriacao vazia", () => {
    expect(
      () =>
        new IdeiaEntity({
          idUsuario: "usuario1",
          titulo: "Nova Ideia",
          descricao: "",
        }),
    ).toThrow("Descricao e obrigatorio");
  });

  it("Deve criar objeto caso sucesso", () => {
    const novaIdeia = new IdeiaEntity({
      idUsuario: "usuario1",
      titulo: "Nova Ideia",
      descricao: "descricao da nova ideia",
    });

    expect(novaIdeia).toMatchObject({
      idUsuario: "usuario1",
      titulo: "Nova Ideia",
      descricao: "descricao da nova ideia",
    });
  });
  it("Deve criar ideia com status PENDENTE por padrao", () => {
    const novaIdeia = new IdeiaEntity({
      idUsuario: "usuario1",
      titulo: "Nova Ideia",
      descricao: "descricao da nova ideia",
    });

    expect(novaIdeia.status).toBe("PENDENTE");
  });
});
