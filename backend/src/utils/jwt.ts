import jwt from "jsonwebtoken";

const JWT_SECRET = process.env.JWT_SECRET || "seatown_container_line_secret_key_2026_safe_fallback!";
const JWT_EXPIRES_IN = "24h";

export interface JWTPayload {
  id: string;
  username: string;
  role: string;
  fullname: string;
}

export const signToken = (payload: JWTPayload): string => {
  return jwt.sign(payload, JWT_SECRET, { expiresIn: JWT_EXPIRES_IN });
};

export const verifyToken = (token: string): JWTPayload => {
  return jwt.verify(token, JWT_SECRET) as JWTPayload;
};
