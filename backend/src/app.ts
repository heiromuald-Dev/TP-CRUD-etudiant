import express from "express";
import cors from "cors";
import morgan from "morgan";
import etudiantRoutes from "./routes/etudiantRoutes";
import authRoutes from "./routes/authRoutes";
import { authenticate } from "./middlewares/authMiddleware";
import { errorHandler, notFoundHandler } from "./middlewares/errorHandler";

const app = express();

app.use(cors());
app.use(morgan("dev"));
app.use(express.json());

app.use("/auth", authRoutes);
app.use("/etudiants", authenticate, etudiantRoutes);

app.use(notFoundHandler);
app.use(errorHandler);

export default app;
