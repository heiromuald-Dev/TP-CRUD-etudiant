import dotenv from "dotenv";
dotenv.config();

import { pool } from "../configuration/database";

const etudiants = [
  { nom: "Rakoto", prenom: "Njaka", email: "njaka.rakoto@mail.com", age: 20 },
  { nom: "Rabe", prenom: "Fara", email: "fara.rabe@mail.com", age: 22 },
  { nom: "Andria", prenom: "Tovo", email: "tovo.andria@mail.com", age: 21 },
];

async function seed() {
  for (const etudiant of etudiants) {
    await pool.query(
      `INSERT INTO etudiants (nom, prenom, email, age)
       VALUES ($1, $2, $3, $4)
       ON CONFLICT (email) DO NOTHING`,
      [etudiant.nom, etudiant.prenom, etudiant.email, etudiant.age]
    );
  }

  console.log("Seed terminé");
  await pool.end();
}

seed().catch((err) => {
  console.error("Erreur pendant le seed :", err);
  process.exit(1);
});
