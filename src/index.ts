import app from "./app";
import { config } from "./configuration/config";

app.listen(config.port, () => {
  console.log(`Serveur démarré sur http://localhost:${config.port}`);
});
