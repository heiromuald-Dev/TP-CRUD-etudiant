import { useState } from "react";
import { login, register } from "../api";

export default function Login({ onSuccess }) {
  const [mode, setMode] = useState("login");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [erreur, setErreur] = useState("");
  const [chargement, setChargement] = useState(false);

  async function handleSubmit(e) {
    e.preventDefault();
    setErreur("");
    setChargement(true);

    try {
      if (mode === "login") {
        const { token } = await login(username, password);
        localStorage.setItem("token", token);
        onSuccess();
      } else {
        await register(username, password);
        setMode("login");
        setErreur("Compte créé, tu peux te connecter.");
      }
    } catch (err) {
      setErreur(err.message);
    } finally {
      setChargement(false);
    }
  }

  return (
    <div className="auth-screen">
      <div className="auth-card">
        <p className="auth-eyebrow">Registre des étudiants</p>
        <h1 className="auth-title">
          {mode === "login" ? "Ouvrir le registre" : "Créer un accès"}
        </h1>

        <form onSubmit={handleSubmit} className="auth-form">
          <label className="field">
            <span>Identifiant</span>
            <input
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              autoComplete="username"
              required
            />
          </label>

          <label className="field">
            <span>Mot de passe</span>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              autoComplete={mode === "login" ? "current-password" : "new-password"}
              required
            />
          </label>

          {erreur && <p className="auth-message">{erreur}</p>}

          <button type="submit" className="btn-primary" disabled={chargement}>
            {chargement
              ? "Un instant…"
              : mode === "login"
              ? "Se connecter"
              : "Créer le compte"}
          </button>
        </form>

        <button
          type="button"
          className="auth-switch"
          onClick={() => {
            setMode(mode === "login" ? "register" : "login");
            setErreur("");
          }}
        >
          {mode === "login"
            ? "Pas encore de compte ? Inscris-toi"
            : "Déjà un compte ? Connecte-toi"}
        </button>
      </div>
    </div>
  );
}
