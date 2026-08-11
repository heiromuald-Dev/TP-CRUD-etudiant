import { Request, Response, NextFunction } from "express";
import * as etudiantRepository from "../repository/etudiant.repository";
import { ApiError } from "../middlewares/ApiError";

export function getAllEtudiants(req: Request, res: Response) {
  const etudiants = etudiantRepository.findAll();
  res.status(200).json({ success: true, data: etudiants });
}

export function getEtudiantById(req: Request, res: Response, next: NextFunction) {
  const id = Number(req.params.id);
  const etudiant = etudiantRepository.findById(id);

  if (!etudiant) {
    return next(new ApiError(404, `Étudiant avec l'id ${id} introuvable`));
  }

  res.status(200).json({ success: true, data: etudiant });
}

export function createEtudiant(req: Request, res: Response, next: NextFunction) {
  const { nom, prenom, email, age } = req.body;

  if (!nom || !prenom || !email || age === undefined) {
    return next(
      new ApiError(400, "Champs requis manquants : nom, prenom, email, age")
    );
  }

  const nouvelEtudiant = etudiantRepository.create({ nom, prenom, email, age });
  res.status(201).json({ success: true, data: nouvelEtudiant });
}

export function updateEtudiant(req: Request, res: Response, next: NextFunction) {
  const id = Number(req.params.id);
  const { nom, prenom, email, age } = req.body;

  if (!nom || !prenom || !email || age === undefined) {
    return next(
      new ApiError(400, "PUT nécessite tous les champs : nom, prenom, email, age")
    );
  }

  const etudiantModifie = etudiantRepository.update(id, { nom, prenom, email, age });

  if (!etudiantModifie) {
    return next(new ApiError(404, `Étudiant avec l'id ${id} introuvable`));
  }

  res.status(200).json({ success: true, data: etudiantModifie });
}

export function patchEtudiant(req: Request, res: Response, next: NextFunction) {
  const id = Number(req.params.id);
  const etudiantModifie = etudiantRepository.patch(id, req.body);

  if (!etudiantModifie) {
    return next(new ApiError(404, `Étudiant avec l'id ${id} introuvable`));
  }

  res.status(200).json({ success: true, data: etudiantModifie });
}

export function deleteEtudiant(req: Request, res: Response, next: NextFunction) {
  const id = Number(req.params.id);
  const supprime = etudiantRepository.remove(id);

  if (!supprime) {
    return next(new ApiError(404, `Étudiant avec l'id ${id} introuvable`));
  }

  res.status(204).send();
}