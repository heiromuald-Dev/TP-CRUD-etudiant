export default function EtudiantsList({ etudiants, onEdit, onDelete }) {
  if (etudiants.length === 0) {
    return (
      <div className="empty-state">
        <p className="empty-title">Le registre est vide</p>
        <p className="empty-subtitle">Ajoute une première fiche avec le formulaire ci-dessus.</p>
      </div>
    );
  }

  return (
    <table className="registre">
      <thead>
        <tr>
          <th>N°</th>
          <th>Nom</th>
          <th>Prénom</th>
          <th>Email</th>
          <th>Âge</th>
          <th></th>
        </tr>
      </thead>
      <tbody>
        {etudiants.map((etudiant) => (
          <tr key={etudiant.id}>
            <td className="cell-mono">{String(etudiant.id).padStart(3, "0")}</td>
            <td>{etudiant.nom}</td>
            <td>{etudiant.prenom}</td>
            <td className="cell-mono">{etudiant.email}</td>
            <td className="cell-mono">{etudiant.age}</td>
            <td className="cell-actions">
              <button className="btn-ghost" onClick={() => onEdit(etudiant)}>
                Modifier
              </button>
              <button className="btn-danger" onClick={() => onDelete(etudiant.id)}>
                Supprimer
              </button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
