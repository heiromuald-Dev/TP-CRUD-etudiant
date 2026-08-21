CREATE TABLE IF NOT EXISTS etudiants (
  id SERIAL PRIMARY KEY,
  nom VARCHAR(100) NOT NULL,
  prenom VARCHAR(100) NOT NULL,
  email VARCHAR(150) NOT NULL UNIQUE,
  age INTEGER NOT NULL
);

CREATE TABLE IF NOT EXISTS users (
  id SERIAL PRIMARY KEY,
  username VARCHAR(100) NOT NULL UNIQUE,
  password VARCHAR(255) NOT NULL
);

INSERT INTO etudiants (nom, prenom, email, age) VALUES
  ('Rakoto', 'Njaka', 'njaka.rakoto@mail.com', 20),
  ('Rabe', 'Fara', 'fara.rabe@mail.com', 22)
ON CONFLICT (email) DO NOTHING;
