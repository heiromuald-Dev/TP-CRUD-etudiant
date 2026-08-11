import { Request, Response, NextFunction } from "express";
import * as etudiantService from "../services/etudiant.service";

export function getAllEtudiants(req: Request, res: Response) {
  const etudiants = etudiantService.getAllEtudiants();
  res.status(200).json({ success: true, data: etudiants });
}

export function getEtudiantById(req: Request, res: Response, next: NextFunction) {
  try {
    const etudiant = etudiantService.getEtudiantById(Number(req.params.id));
    res.status(200).json({ success: true, data: etudiant });
  } catch (err) {
    next(err);
  }
}

export function createEtudiant(req: Request, res: Response, next: NextFunction) {
  try {
    const nouvelEtudiant = etudiantService.createEtudiant(req.body);
    res.status(201).json({ success: true, data: nouvelEtudiant });
  } catch (err) {
    next(err);
  }
}

export function updateEtudiant(req: Request, res: Response, next: NextFunction) {
  try {
    const etudiant = etudiantService.updateEtudiant(Number(req.params.id), req.body);
    res.status(200).json({ success: true, data: etudiant });
  } catch (err) {
    next(err);
  }
}

export function patchEtudiant(req: Request, res: Response, next: NextFunction) {
  try {
    const etudiant = etudiantService.patchEtudiant(Number(req.params.id), req.body);
    res.status(200).json({ success: true, data: etudiant });
  } catch (err) {
    next(err);
  }
}

export function deleteEtudiant(req: Request, res: Response, next: NextFunction) {
  try {
    etudiantService.deleteEtudiant(Number(req.params.id));
    res.status(204).send();
  } catch (err) {
    next(err);
  }
}