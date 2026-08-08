import { Router } from "express";
import IdeiaController from "./ideia.controller.js";
import AuthMidlleware from "../shared/middlewares/auth.midlleware.js";
import AdminMiddleware from "../shared/middlewares/admin.middleware.js";

console.log('Loading ideia.routes');
const router = Router();

router.get("/", IdeiaController.buscarIdeias);

router.post("/", AuthMidlleware.validar, IdeiaController.criarNovaIdeia);

router.patch(
  "/:id/status",
  AuthMidlleware.validar,
  AdminMiddleware.verificarAdmin,
  IdeiaController.atualizarStatus,
);


export default router;