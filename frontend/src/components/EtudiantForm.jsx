import { useEffect, useState } from "react";

const VIDE = { nom: "", prenom: "", email: "", age: "" };

export default function EtudiantForm({ etudiantACorriger, onSubmit, onCancel }) {
  const [valeurs, setValeurs] = useState(VIDE);
  const [erreur, setErreur] = useState("");

  useEffect(() => {
    setValeurs(
      etudiantACorriger
        ? {
            nom: etudiantACorriger.nom,
            prenom: etudiantACorriger.prenom,
            email: etudiantACorriger.email,
            age: etudiantACorriger.age,
          }
        : VIDE
    );
    setErreur("");
  }, [etudiantACorriger]);

  function handleChange(champ, valeur) {
    setValeurs((v) => ({ ...v, [champ]: valeur }));
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setErreur("");

    try {
      await onSubmit({ ...valeurs, age: Number(valeurs.age) });
      setValeurs(VIDE);
    } catch (err) {
      setErreur(err.message);
    }
  }

  return (
    <form onSubmit={handleSubmit} className="etudiant-form">
      <p className="form-eyebrow">
        {etudiantACorriger ? `Fiche n°${etudiantACorriger.id}` : "Nouvelle fiche"}
      </p>

      <div className="form-grid">
        <label className="field">
          <span>Nom</span>
          <input
            value={valeurs.nom}
            onChange={(e) => handleChange("nom", e.target.value)}
            required
          />
        </label>

        <label className="field">
          <span>Prénom</span>
          <input
            value={valeurs.prenom}
            onChange={(e) => handleChange("prenom", e.target.value)}
            required
          />
        </label>

        <label className="field">
          <span>Email</span>
          <input
            type="email"
            value={valeurs.email}
            onChange={(e) => handleChange("email", e.target.value)}
            required
          />
        </label>

        <label className="field">
          <span>Âge</span>
          <input
            type="number"
            min="0"
            max="120"
            value={valeurs.age}
            onChange={(e) => handleChange("age", e.target.value)}
            required
          />
        </label>
      </div>

      {erreur && <p className="form-message">{erreur}</p>}

      <div className="form-actions">
        <button type="submit" className="btn-primary">
          {etudiantACorriger ? "Enregistrer" : "Ajouter à la liste"}
        </button>
        {etudiantACorriger && (
          <button type="button" className="btn-ghost" onClick={onCancel}>
            Annuler
          </button>
        )}
      </div>
    </form>
  );
}
