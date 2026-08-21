export class ApiError extends Error {
  statusCode: number;

  constructor(statusCode: number, message: string) {
    super(message);
    this.statusCode = statusCode;
    this.name = "ApiError";
  }

  static notFound(message = "Ressource introuvable") {
    return new ApiError(404, message);
  }

  static badRequest(message = "Requête invalide") {
    return new ApiError(400, message);
  }

  static conflict(message = "Conflit avec une ressource existante") {
    return new ApiError(409, message);
  }

  static unauthorized(message = "Non autorisé") {
    return new ApiError(401, message);
  }
}
