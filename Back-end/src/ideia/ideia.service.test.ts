import { IdeiaStatus } from "../../generated/prisma/enums.js";
import { prisma } from "../shared/prisma.js";
import IdeiaService from "./ideia.service.js";

describe("IdeiaService", () => {
  vi.mock("../shared/prisma.ts", () => ({
    prisma: {
      ideia: {
        findMany: vi.fn(),
        create: vi.fn(),
        update: vi.fn(),
        findUnique: vi.fn(),
      },
    },
  }));
  it("De retornar ideias", async () => {
    const ideiaFake = {
      id: "123",
      titulo: "novaIdeia",
      descricao: "descNovaIdeia",
      status: "PENDENTE" as IdeiaStatus,
      idUsuario: "usuario1",
      createdAt: new Date(),
    };

    vi.mocked(prisma.ideia.findMany).mockResolvedValue([ideiaFake]);

    const ideias = await IdeiaService.buscarIdeias();

    expect(ideias).toEqual([ideiaFake]);
  });

  it("Deve criar nova ideia", async () => {
    const ideiaFake = {
      id: "123",
      titulo: "novaIdeia",
      descricao: "descNovaIdeia",
      status: "PENDENTE" as IdeiaStatus,
      idUsuario: "usuario1",
      createdAt: new Date(),
    };

    vi.mocked(prisma.ideia.create).mockResolvedValue(ideiaFake);

    const novaIdeia = await IdeiaService.criarNovaIdeia({
      titulo: "novaIdeia",
      descricao: "descNovaIdeia",
      idUsuario: "usuario1",
    });
    expect(novaIdeia).toEqual(ideiaFake);
  });


  it("Deve atualizar status da ideia", async () => {
    const ideiaFake = {
      id: "123",
      titulo: "novaIdeia",
      descricao: "descNovaIdeia",
      status: "PENDENTE" as IdeiaStatus,
      idUsuario: "usuario1",
      createdAt: new Date(),
    };

    const ideiaAtualizada = {
      ...ideiaFake,
      status: "DESENVOLVIMENTO" as IdeiaStatus,
    };

    vi.mocked(prisma.ideia.findUnique).mockResolvedValue(ideiaFake);
    vi.mocked(prisma.ideia.update).mockResolvedValue(ideiaAtualizada);

    const resultado = await IdeiaService.atualizarStatus(
      "123",
      "DESENVOLVIMENTO",
    );

    expect(resultado).toEqual(ideiaAtualizada);
    expect(prisma.ideia.update).toHaveBeenCalledWith({
      where: {
        id: "123",
      },
      data: {
        status: "DESENVOLVIMENTO",
      },
    });
  });

  it("Deve lancar erro para id nao encontrado", async () => {
    vi.mocked(prisma.ideia.findUnique).mockResolvedValue(null);

    await expect(IdeiaService.atualizarStatus("999", "DESENVOLVIMENTO")).rejects.toThrow(
      "Ideia nao encontrada.",
    );
  });
});
