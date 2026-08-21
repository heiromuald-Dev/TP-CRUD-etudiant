import { useEffect, useState } from "react";
import Login from "./components/Login";
import EtudiantForm from "./components/EtudiantForm";
import EtudiantsList from "./components/EtudiantsList";
import { getEtudiants, createEtudiant, updateEtudiant, deleteEtudiant, isLoggedIn, logout } from "./api";

export default function App() {
  const [connecte, setConnecte] = useState(isLoggedIn());
  const [etudiants, setEtudiants] = useState([]);
  const [etudiantACorriger, setEtudiantACorriger] = useState(null);
  const [erreur, setErreur] = useState("");
  const [chargement, setChargement] = useState(false);

  async function chargerEtudiants() {
    setChargement(true);
    setErreur("");
    try {
      const data = await getEtudiants();
      setEtudiants(data);
    } catch (err) {
      setErreur(err.message);
    } finally {
      setChargement(false);
    }
  }

  useEffect(() => {
    if (connecte) chargerEtudiants();
  }, [connecte]);

  async function handleCreerOuModifier(valeurs) {
    if (etudiantACorriger) {
      const maj = await updateEtudiant(etudiantACorriger.id, valeurs);
      setEtudiants((liste) => liste.map((e) => (e.id === maj.id ? maj : e)));
      setEtudiantACorriger(null);
    } else {
      const nouveau = await createEtudiant(valeurs);
      setEtudiants((liste) => [...liste, nouveau]);
    }
  }

  async function handleSupprimer(id) {
    try {
      await deleteEtudiant(id);
      setEtudiants((liste) => liste.filter((e) => e.id !== id));
    } catch (err) {
      setErreur(err.message);
    }
  }

  function handleDeconnexion() {
    logout();
    setConnecte(false);
    setEtudiants([]);
  }

  if (!connecte) {
    return <Login onSuccess={() => setConnecte(true)} />;
  }

  return (
    <div className="page">
      <header className="page-header">
        <div>
          <p className="page-eyebrow">Registre des étudiants</p>
          <h1 className="page-title">Fiches en cours</h1>
        </div>
        <button className="btn-ghost" onClick={handleDeconnexion}>
          Se déconnecter
        </button>
      </header>

      <section className="panel">
        <EtudiantForm
          etudiantACorriger={etudiantACorriger}
          onSubmit={handleCreerOuModifier}
          onCancel={() => setEtudiantACorriger(null)}
        />
      </section>

      {erreur && <p className="page-error">{erreur}</p>}

      <section className="panel">
        {chargement ? (
          <p className="empty-subtitle">Chargement du registre…</p>
        ) : (
          <EtudiantsList
            etudiants={etudiants}
            onEdit={setEtudiantACorriger}
            onDelete={handleSupprimer}
          />
        )}
      </section>
    </div>
  );
}
