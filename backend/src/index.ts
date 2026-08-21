import dotenv from "dotenv";
dotenv.config();

import app from "./app";
import { config } from "./configuration/config";
import { pool } from "./configuration/database";

const server = app.listen(config.port, () => {
  console.log(`Serveur démarré sur http://localhost:${config.port}`);
});

async function shutdown() {
  server.close(async () => {
    await pool.end();
    process.exit(0);
  });
}

process.on("SIGINT", shutdown);
process.on("SIGTERM", shutdown);
