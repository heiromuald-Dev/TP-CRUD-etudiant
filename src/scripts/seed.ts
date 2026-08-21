import { Etudiant } from "../models/etudiantModel";

export const donneesDeTest: Etudiant[] = [
  { id: 1, nom: "John", prenom: "Doe", email: "john@mail.com", age: 20 },
  { id: 2, nom: "Marie", prenom: "Jane", email: "marie@mail.com", age: 22 },
  { id: 3, nom: "Parker", prenom: "Petter", email: "Parker@mail.com", age: 21 },
];

if (require.main === module) {
  console.log("Données de test :");
  console.log(donneesDeTest);
}