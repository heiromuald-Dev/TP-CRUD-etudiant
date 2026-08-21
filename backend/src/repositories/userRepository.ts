import { User } from "../models/userModel";
import { pool } from "../configuration/database";

export async function findByUsername(username: string): Promise<User | undefined> {
  const result = await pool.query("SELECT * FROM users WHERE username = $1", [username]);
  return result.rows[0];
}

export async function create(username: string, hashedPassword: string): Promise<User> {
  const result = await pool.query(
    `INSERT INTO users (username, password)
     VALUES ($1, $2)
     RETURNING *`,
    [username, hashedPassword]
  );
  return result.rows[0];
}
