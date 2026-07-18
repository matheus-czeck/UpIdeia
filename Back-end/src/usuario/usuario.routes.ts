import { Router } from "express";
import UsuarioController from "./usuario.controller.js";

const router = Router()

router.post("/", UsuarioController.criar)
router.post("/login", UsuarioController.entrar)

export default router;

