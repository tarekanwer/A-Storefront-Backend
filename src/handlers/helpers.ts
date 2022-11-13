import jwt from "jsonwebtoken";
import { NextFunction, Request, Response } from "express";
import { User } from "../models/users";
import dotenv from "dotenv";
dotenv.config();
const secret_token = process.env.TOKEN_SECRET as string;

export function getTokenByUser(user: User) {
  return jwt.sign({ user }, secret_token);
}

export const verifyAuthToken = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const authorizationHeader = req.headers.authorization as string;
    const token = authorizationHeader ? authorizationHeader.split(" ")[1] : "";
    const decoded = jwt.verify(token, secret_token);
    next();
  } catch (error) {
    res.status(401);
    res.json('jwt must be provided')
  }
};
