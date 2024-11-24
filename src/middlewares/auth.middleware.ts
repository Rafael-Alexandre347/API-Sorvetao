import { NextFunction, Request, Response } from "express";
import * as jose from "jose";

declare module "express-serve-static-core" {
  interface Request {
    user?: jose.JWTPayload;
  }
}

export const auth = async (req: Request, res: Response, next: NextFunction) => {
  const token = req.headers.authorization?.split(" ")[1];

  if (!token) {
    return res.status(401).json({ message: "Token não identificado" });
  }

  try {
    const secret = new TextEncoder().encode(process.env.JWT_SECRET);
    const payload = await jose.jwtVerify(token, secret);

    if (!payload) {
      return res.status(401).json({ message: "Token inválido :(" });
    }

    req.user = payload.payload;
    next();
  } catch (error) {
    return res.status(401).json({ message: "Token inválido :(" });
  }
};
