import { Pool } from "pg";

export const pool = new Pool({
  host: process.env.DB_HOST || "localhost",
  port: Number(process.env.DB_PORT) || 5432,
  user: process.env.DB_USER || "postgres",
  password: process.env.DB_PASSWORD || "postgres",
  database: process.env.DB_NAME || "tp_etudiants",
});

pool
  .connect()
  .then((client) => {
    console.log("Connecté à PostgreSQL");
    client.release();
  })
  .catch((err) => {
    console.error("Impossible de se connecter à PostgreSQL :", err.message);
  });
