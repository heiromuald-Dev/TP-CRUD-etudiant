import { Request, Response, NextFunction } from "express";
import * as etudiantService from "../services/etudiantService";
import { ApiError } from "../middlewares/ApiError";

function parseId(rawId: string): number {
  const id = Number(rawId);
  if (!Number.isInteger(id) || id <= 0) {
    throw new ApiError(400, "L'id doit être un entier positif");
  }
  return id;
}

export async function getAllEtudiants(req: Request, res: Response, next: NextFunction) {
  try {
    const etudiants = await etudiantService.getAllEtudiants();
    res.status(200).json({ success: true, data: etudiants });
  } catch (err) {
    next(err);
  }
}

export async function getEtudiantById(req: Request, res: Response, next: NextFunction) {
  try {
    const id = parseId(req.params.id);
    const etudiant = await etudiantService.getEtudiantById(id);
    res.status(200).json({ success: true, data: etudiant });
  } catch (err) {
    next(err);
  }
}

export async function createEtudiant(req: Request, res: Response, next: NextFunction) {
  try {
    const nouvelEtudiant = await etudiantService.createEtudiant(req.body);
    res.status(201).json({ success: true, data: nouvelEtudiant });
  } catch (err) {
    next(err);
  }
}

export async function updateEtudiant(req: Request, res: Response, next: NextFunction) {
  try {
    const id = parseId(req.params.id);
    const etudiant = await etudiantService.updateEtudiant(id, req.body);
    res.status(200).json({ success: true, data: etudiant });
  } catch (err) {
    next(err);
  }
}

export async function patchEtudiant(req: Request, res: Response, next: NextFunction) {
  try {
    const id = parseId(req.params.id);
    const etudiant = await etudiantService.patchEtudiant(id, req.body);
    res.status(200).json({ success: true, data: etudiant });
  } catch (err) {
    next(err);
  }
}

export async function deleteEtudiant(req: Request, res: Response, next: NextFunction) {
  try {
    const id = parseId(req.params.id);
    await etudiantService.deleteEtudiant(id);
    res.status(204).send();
  } catch (err) {
    next(err);
  }
}
