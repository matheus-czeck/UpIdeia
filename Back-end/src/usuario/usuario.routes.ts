import { Router } from "express";
import UsuarioController from "./usuario.controller.js";

console.log('Loading usuario.routes');
const router = Router()

router.post("/", UsuarioController.criar)
router.post("/login", UsuarioController.entrar)

export default router;

