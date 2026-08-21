import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import * as userRepository from "../repositories/userRepository";
import { ApiError } from "../middlewares/ApiError";
import { config } from "../configuration/config";
import { AuthPayload } from "../models/userModel";

const SALT_ROUNDS = 10;

export async function register(username: string, password: string) {
  if (!username || !password) {
    throw new ApiError(400, "Champs requis manquants : username, password");
  }

  const existant = await userRepository.findByUsername(username);
  if (existant) {
    throw new ApiError(409, "Ce nom d'utilisateur est déjà pris");
  }

  const hashedPassword = await bcrypt.hash(password, SALT_ROUNDS);
  const user = await userRepository.create(username, hashedPassword);

  return { id: user.id, username: user.username };
}

export async function login(username: string, password: string) {
  if (!username || !password) {
    throw new ApiError(400, "Champs requis manquants : username, password");
  }

  const user = await userRepository.findByUsername(username);
  if (!user) {
    throw new ApiError(401, "Identifiants invalides");
  }

  const motDePasseValide = await bcrypt.compare(password, user.password);
  if (!motDePasseValide) {
    throw new ApiError(401, "Identifiants invalides");
  }

  const payload: AuthPayload = { id: user.id, username: user.username };
  const token = jwt.sign(payload, config.jwtSecret, { expiresIn: config.jwtExpiresIn } as jwt.SignOptions);

  return { token };
}
