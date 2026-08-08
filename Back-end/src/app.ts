import cors from "cors";
import express from "express";
import usuarioRoutes from "./usuario/usuario.routes.js";
import ideiasRoutes from "./ideia/ideia.routes.js";
import votoRouter from "./voto/voto.routes.js";
import { handlerErro } from "./shared/errors/handler.error.js";

const app = express();

app.use(
  cors({
    origin: process.env.ALLOWED_ORIGINS?.split(",") || [
      "http://localhost:4200",
    ],
  }),
);
app.use(express.json());
app.use("/usuario", usuarioRoutes);
app.use("/ideias", ideiasRoutes);
app.use("/voto", votoRouter);
app.use(handlerErro);


export default app;
