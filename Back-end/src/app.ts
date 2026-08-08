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

// Debug route: lista rotas registradas (dev only)
app.get('/_routes', (req, res) => {
  // @ts-ignore
  const routes = [];
  // @ts-ignore
  app._router.stack.forEach((middleware) => {
    if (middleware.route) {
      // routes registered directly on the app
      routes.push(middleware.route.path);
    } else if (middleware.name === 'router') {
      // router middleware
      // @ts-ignore
      middleware.handle.stack.forEach(function(handler) {
        const route = handler.route;
        if (route) routes.push(route.path);
      });
    }
  });
  res.json({ routes });
});

export default app;
