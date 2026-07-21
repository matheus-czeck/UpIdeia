import { regraUsuario } from "../../generated/prisma/enums.js";
import { prisma } from "../shared/prisma.js";
import UsuarioService from "./usuario.service.js";

describe("UsuarioService", () => {
  vi.mock("../shared/prisma.ts", () => ({
    prisma: {
      usuario: {
        create: vi.fn(),
        findUnique: vi.fn(),
      },
    },
  }));

  it("Deve criar usuario", async () => {
    const usuarioFake = {
      id: "123",
      nome: "mathues",
      email: "matheus@gmail.com",
      regra: "USUARIO" as regraUsuario,
      createdAt: new Date(),
    };

    vi.mocked(prisma.usuario.create).mockResolvedValue(usuarioFake);

    const resultado = await UsuarioService.criar({
      id: "123",
      nome: "matheus",
      email: "matheus@gmail.com",
    });
    expect(resultado).toEqual(usuarioFake);
    expect(prisma.usuario.create).toHaveBeenCalledWith({
      data: expect.objectContaining({ nome: "matheus" }),
    });
  });

  it("Deve retornar nome e status de usuario ja criado", async () => {
    const usuarioFake = {
      id: "123",
      nome: "mathues",
      email: "matheus@gmail.com",
      regra: "USUARIO" as regraUsuario,
      createdAt: new Date(),
    };
    vi.mocked(prisma.usuario.findUnique).mockResolvedValue(usuarioFake);

    const resultado = await UsuarioService.buscarPorId("123");

    expect(resultado).toEqual(usuarioFake);

    expect(prisma.usuario.findUnique).toHaveBeenCalledWith({
      where: { id: "123" },
    });
  });

  it("Deve retornar erro para usuario nao encontrado", async () => {
    vi.mocked(prisma.usuario.findUnique).mockResolvedValue(null);

    await expect(UsuarioService.buscarPorId("999")).rejects.toThrow(
      "Usuario nao encontrado!",
    );
  });
});
