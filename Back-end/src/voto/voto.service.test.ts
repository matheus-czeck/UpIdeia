import { IdeiaStatus } from "../../generated/prisma/enums.js";
import { prisma } from "../shared/prisma.js";
import VotoService from "./voto.service.js";

vi.mock("../shared/prisma.ts", () => ({
  prisma: {
    voto: {
      create: vi.fn(),
      findUnique: vi.fn(),
    },
    ideia: {
      findUnique: vi.fn(),
    },
  },
}));

describe("VotoService", () => {
  it("Deve registrar voto com sucesos", async () => {
    const votoFake = {
      id: "123",
      idUsuario: "usuario1",
      idIdeia: "ideia1",
      createdAt: new Date(),
    };
    vi.mocked(prisma.voto.findUnique).mockResolvedValue(null);
    vi.mocked(prisma.voto.create).mockResolvedValue(votoFake);

    const novoVoto = await VotoService.registrarVoto({
      id: "123",
      idUsuario: "usuario1",
      idIdeia: "ideia1",
    });

    expect(novoVoto).toEqual(votoFake);
  });

  it("Deve retornar erro para ja votado", async () => {
    const votoFake = {
      id: "123",
      idUsuario: "usuario1",
      idIdeia: "ideia1",
      createdAt: new Date(),
    };

    vi.mocked(prisma.voto.findUnique).mockResolvedValue(votoFake);

    await expect(
      VotoService.registrarVoto({
        id: "123",
        idUsuario: "usuario1",
        idIdeia: "ideia1",
      }),
    ).rejects.toThrow("Voto ja registrado!");
  });

  it("Deve retornar erro em voto na propria ideia", async () => {
    const ideiaFake = {
      id: "ideia1",
      titulo: "novaIdeia",
      descricao: "descNovaIdeia",
      status: "PENDENTE" as IdeiaStatus,
      idUsuario: "usuario1",
      createdAt: new Date(),
    };

    vi.mocked(prisma.ideia.findUnique).mockResolvedValue(ideiaFake);

    await expect(
      VotoService.registrarVoto({
        id: "123",
        idUsuario: "usuario1",
        idIdeia: "ideia1",
      }),
    ).rejects.toThrow("Voce nao pode votar na propria ideia!");
  });
});
