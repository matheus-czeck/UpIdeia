import { Request, Response, NextFunction } from "express";
import AppError from "./app.error.js";

export function handlerErro(
  error: Error,
  req: Request,
  res: Response,
  next: NextFunction,
) {
  if (error instanceof AppError) {
    return res.status(error.status).json({ error: error.message });
  }

  return res.status(500).json({ error: "Erro interno no servidor" });
}
