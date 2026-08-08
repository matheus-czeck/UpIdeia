import { Router } from "express";
import AuthMidlleware from "../shared/middlewares/auth.midlleware.js";
import VotoController from "./voto.controller.js";

console.log('Loading voto.routes');
const router = Router()

router.post("/:idIdeia", AuthMidlleware.validar, VotoController.registarVoto)
router.get("/me", AuthMidlleware.validar, VotoController.buscarMeusVotos)
router.delete("/:idIdeia", AuthMidlleware.validar, VotoController.removerVoto)

export default router;
