import express from "express";
import cors from "cors";

const app = express();

app.use(cors({ origin: process.env.ALLOWED_ORIGINS }));
app.use(express.json())


export default app;
