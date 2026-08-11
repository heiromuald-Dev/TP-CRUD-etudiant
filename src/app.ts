import express from "express";
import etudiantRoutes from "./routes/etudiant.routes";
import { errorHandler, notFoundHandler } from "./middlewares/errorHandler";

const app = express();

app.use(express.json());

app.use("/etudiants", etudiantRoutes);

app.use(notFoundHandler);

app.use(errorHandler);

export default app;
