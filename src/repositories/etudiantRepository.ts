import { Etudiant } from "../models/etudiantModel";
import { pool } from "../configuration/database";

// Chaque fonction est maintenant ASYNCHRONE : une requête SQL prend du
// temps (aller-retour réseau vers la base), donc on utilise async/await
// au lieu de manipuler un tableau en mémoire instantanément.

export async function findAll(): Promise<Etudiant[]> {
  const result = await pool.query("SELECT * FROM etudiants ORDER BY id");
  return result.rows;
}

export async function findById(id: number): Promise<Etudiant | undefined> {
  const result = await pool.query("SELECT * FROM etudiants WHERE id = $1", [id]);
  return result.rows[0];
}

export async function create(data: Omit<Etudiant, "id">): Promise<Etudiant> {
  const { nom, prenom, email, age } = data;
  const result = await pool.query(
    `INSERT INTO etudiants (nom, prenom, email, age)
     VALUES ($1, $2, $3, $4)
     RETURNING *`,
    [nom, prenom, email, age]
  );
  return result.rows[0];
}

export async function update(
  id: number,
  data: Omit<Etudiant, "id">
): Promise<Etudiant | null> {
  const { nom, prenom, email, age } = data;
  const result = await pool.query(
    `UPDATE etudiants
     SET nom = $1, prenom = $2, email = $3, age = $4
     WHERE id = $5
     RETURNING *`,
    [nom, prenom, email, age, id]
  );
  return result.rows[0] || null;
}

export async function patch(
  id: number,
  data: Partial<Omit<Etudiant, "id">>
): Promise<Etudiant | null> {
  const existant = await findById(id);
  if (!existant) return null;

  const fusionne = { ...existant, ...data };

  const result = await pool.query(
    `UPDATE etudiants
     SET nom = $1, prenom = $2, email = $3, age = $4
     WHERE id = $5
     RETURNING *`,
    [fusionne.nom, fusionne.prenom, fusionne.email, fusionne.age, id]
  );
  return result.rows[0] || null;
}

export async function remove(id: number): Promise<boolean> {
  const result = await pool.query("DELETE FROM etudiants WHERE id = $1", [id]);
  return (result.rowCount ?? 0) > 0;
}
