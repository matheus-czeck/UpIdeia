import { Router } from "express";
import AuthMidlleware from "../shared/middlewares/auth.midlleware.js";
import VotoController from "./voto.controller.js";

const router = Router()

router.post("/:idIdeia", AuthMidlleware.validar, VotoController.registarVoto)

export default router;
