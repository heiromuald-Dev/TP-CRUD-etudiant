export const config = {
  port: Number(process.env.PORT) || 3000,
  env: process.env.NODE_ENV || "development",
  jwtSecret: process.env.JWT_SECRET || "change_this_secret_in_production",
  jwtExpiresIn: process.env.JWT_EXPIRES_IN || "1h",
};
