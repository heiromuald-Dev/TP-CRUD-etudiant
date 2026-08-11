import { Etudiant } from "../models/etudiant.model";
import { donneesDeTest } from "../scripts/seed";

let etudiants: Etudiant[] = [...donneesDeTest];

let nextId = 4;  

export function findAll(): Etudiant[] {
  return etudiants;
}

export function findById(id: number): Etudiant | undefined {
  return etudiants.find((e) => e.id === id);
}

export function create(data: Omit<Etudiant, "id">): Etudiant {
  const nouvelEtudiant: Etudiant = { id: nextId++, ...data };
  etudiants.push(nouvelEtudiant);
  return nouvelEtudiant;
}

export function update(id: number, data: Omit<Etudiant, "id">): Etudiant | null {
  const index = etudiants.findIndex((e) => e.id === id);
  if (index === -1) return null;
  etudiants[index] = { id, ...data };
  return etudiants[index];
}

export function patch(id: number, data: Partial<Omit<Etudiant, "id">>): Etudiant | null {
  const index = etudiants.findIndex((e) => e.id === id);
  if (index === -1) return null;
  etudiants[index] = { ...etudiants[index], ...data };
  return etudiants[index];
}

export function remove(id: number): boolean {
  const index = etudiants.findIndex((e) => e.id === id);
  if (index === -1) return false;
  etudiants.splice(index, 1);
  return true;
}