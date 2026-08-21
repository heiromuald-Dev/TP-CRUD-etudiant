import { Etudiant } from "../models/etudiantModel";
import * as etudiantRepository from "../repositories/etudiantRepository";
import { ApiError } from "../middlewares/ApiError";

type EtudiantInput = Omit<Etudiant, "id">;

function validerChamps(data: Partial<EtudiantInput>, tousRequis: boolean) {
  const { nom, prenom, email, age } = data;

  if (tousRequis && (!nom || !prenom || !email || age === undefined)) {
    throw new ApiError(400, "Champs requis manquants : nom, prenom, email, age");
  }

  if (nom !== undefined && typeof nom !== "string") {
    throw new ApiError(400, "Le nom doit être une chaîne de caractères");
  }

  if (prenom !== undefined && typeof prenom !== "string") {
    throw new ApiError(400, "Le prénom doit être une chaîne de caractères");
  }

  if (email !== undefined && (typeof email !== "string" || !email.includes("@"))) {
    throw new ApiError(400, "L'email doit être une chaîne de caractères valide (doit contenir un @)");
  }

  if (age !== undefined && (typeof age !== "number" || age < 0 || age > 120)) {
    throw new ApiError(400, "L'âge doit être un nombre compris entre 0 et 120");
  }
}

function estUniqueViolation(err: unknown): boolean {
  return typeof err === "object" && err !== null && (err as { code?: string }).code === "23505";
}

export async function getAllEtudiants(): Promise<Etudiant[]> {
  return etudiantRepository.findAll();
}

export async function getEtudiantById(id: number): Promise<Etudiant> {
  const etudiant = await etudiantRepository.findById(id);

  if (!etudiant) {
    throw new ApiError(404, `Étudiant avec l'id ${id} introuvable`);
  }

  return etudiant;
}

export async function createEtudiant(data: EtudiantInput): Promise<Etudiant> {
  validerChamps(data, true);

  try {
    return await etudiantRepository.create(data);
  } catch (err) {
    if (estUniqueViolation(err)) {
      throw new ApiError(409, "Un étudiant avec cet email existe déjà");
    }
    throw err;
  }
}

export async function updateEtudiant(id: number, data: EtudiantInput): Promise<Etudiant> {
  validerChamps(data, true);

  try {
    const etudiantModifie = await etudiantRepository.update(id, data);

    if (!etudiantModifie) {
      throw new ApiError(404, `Étudiant avec l'id ${id} introuvable`);
    }

    return etudiantModifie;
  } catch (err) {
    if (estUniqueViolation(err)) {
      throw new ApiError(409, "Un étudiant avec cet email existe déjà");
    }
    throw err;
  }
}

export async function patchEtudiant(
  id: number,
  data: Partial<EtudiantInput>
): Promise<Etudiant> {
  validerChamps(data, false);

  try {
    const etudiantModifie = await etudiantRepository.patch(id, data);

    if (!etudiantModifie) {
      throw new ApiError(404, `Étudiant avec l'id ${id} introuvable`);
    }

    return etudiantModifie;
  } catch (err) {
    if (estUniqueViolation(err)) {
      throw new ApiError(409, "Un étudiant avec cet email existe déjà");
    }
    throw err;
  }
}

export async function deleteEtudiant(id: number): Promise<void> {
  const supprime = await etudiantRepository.remove(id);

  if (!supprime) {
    throw new ApiError(404, `Étudiant avec l'id ${id} introuvable`);
  }
}
