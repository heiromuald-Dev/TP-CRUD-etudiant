# Frontend — Registre des étudiants

Petite app React/Vite qui consomme l'API `tp-etudiants-api` : connexion JWT, puis CRUD complet sur les étudiants.

## Installation

```bash
npm install
cp .env.example .env
```

Vérifie que `VITE_API_URL` pointe bien vers ton backend (par défaut `http://localhost:3000`).

## Lancer en développement

```bash
npm run dev
```

L'app démarre sur **http://localhost:5173**

Le backend doit tourner en parallèle (`npm run dev` dans `tp-etudiants-api`), avec les tables déjà créées (`init.sql`).

## Utilisation

1. Ouvre `http://localhost:5173`.
2. Inscris-toi (bouton "Pas encore de compte ?"), puis connecte-toi.
3. Ajoute, modifie ou supprime des étudiants depuis l'interface — le token JWT est stocké dans `localStorage` et envoyé automatiquement sur chaque requête.

## Build de production

```bash
npm run build
```

Génère le dossier `dist/`, à servir avec n'importe quel serveur statique (ou `npm run preview` pour tester localement).

## Structure

```
src/
├── main.jsx                       # point d'entrée React
├── App.jsx                        # état global, orchestration login/CRUD
├── api.js                         # client API (fetch + token)
├── styles.css
└── components/
    ├── Login.jsx                  # connexion / inscription
    ├── EtudiantForm.jsx           # création / modification
    └── EtudiantsList.jsx          # tableau des étudiants
```
