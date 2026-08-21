import { Etudiant } from "../models/etudiantModel";
import * as etudiantRepository from "../repositories/etudiantRepository";
import { ApiError } from "../middlewares/ApiError";

type EtudiantInput = Omit<Etudiant, "id">;

function validerChamps(data: Partial<EtudiantInput>, tousRequis: boolean) {
  const { nom, prenom, email, age } = data;

  if (tousRequis && (!nom || !prenom || !email || age === undefined)) {
    throw new ApiError(400, "Champs requis manquants : nom, prenom, email, age");
  }

  if (email !== undefined && !email.includes("@")) {
    throw new ApiError(400, "L'email doit être valide (doit contenir un @)");
  }

  if (age !== undefined && (age < 0 || age > 120)) {
    throw new ApiError(400, "L'âge doit être compris entre 0 et 120");
  }
}

export function getAllEtudiants(): Etudiant[] {
  return etudiantRepository.findAll();
}

export function getEtudiantById(id: number): Etudiant {
  const etudiant = etudiantRepository.findById(id);
  if (!etudiant) throw new ApiError(404, `Étudiant avec l'id ${id} introuvable`);
  return etudiant;
}

export function createEtudiant(data: EtudiantInput): Etudiant {
  validerChamps(data, true);
  return etudiantRepository.create(data);
}

export function updateEtudiant(id: number, data: EtudiantInput): Etudiant {
  validerChamps(data, true);
  const etudiantModifie = etudiantRepository.update(id, data);
  if (!etudiantModifie) throw new ApiError(404, `Étudiant avec l'id ${id} introuvable`);
  return etudiantModifie;
}

export function patchEtudiant(id: number, data: Partial<EtudiantInput>): Etudiant {
  validerChamps(data, false);
  const etudiantModifie = etudiantRepository.patch(id, data);
  if (!etudiantModifie) throw new ApiError(404, `Étudiant avec l'id ${id} introuvable`);
  return etudiantModifie;
}

export function deleteEtudiant(id: number): void {
  const supprime = etudiantRepository.remove(id);
  if (!supprime) throw new ApiError(404, `Étudiant avec l'id ${id} introuvable`);
}