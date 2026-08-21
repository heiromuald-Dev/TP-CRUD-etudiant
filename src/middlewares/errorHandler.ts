import { Request, Response, NextFunction } from "express";
import { ApiError } from "./ApiError";

// Middleware "catch-all" : toute erreur passée à next(err) dans les
// controllers finit ici. Doit être déclaré en DERNIER dans server.ts,
// avec 4 arguments (c'est ce qui indique à Express que c'est un
// error-handling middleware).
export function errorHandler(
  err: unknown,
  req: Request,
  res: Response,
  next: NextFunction
) {
  console.error("[ERREUR]", err);

  if (err instanceof ApiError) {
    return res.status(err.statusCode).json({
      erreur: err.message,
    });
  }

  // Erreur inconnue / inattendue -> 500
  return res.status(500).json({
    erreur: "Erreur interne du serveur",
  });
}

// Middleware pour les routes qui n'existent pas (404 générique)
export function notFoundHandler(req: Request, res: Response) {
  res.status(404).json({
    erreur: `Route ${req.method} ${req.originalUrl} introuvable`,
  });
}
