import { NextFunction, Request, Response } from "express";
import { verify } from "jsonwebtoken";
import { AppError } from "../Errors/AppError";
import { UserRepository } from "../modules/accounts/repositories/UsersRepository";

export const ensureAuthenticated = async (
  req: Request,
  _res: Response,
  next: NextFunction
): Promise<void> => {
  const authHeader = req.headers.authorization;
  try {
    if (!authHeader) throw new AppError("Token is required!", 401);

    const token = authHeader.split(" ")[1];
    const tokenKey = process.env.TOKEN_KEY;

    const { sub: userId } = verify(token, String(tokenKey)) as { sub: string };

    if (!userId) throw new AppError("Token is invalid!");

    const usersRepository = new UserRepository();
    const user = await usersRepository.findById(userId);

    if (!user) throw new AppError("User does not exists!", 401);

    next();
  } catch (err) {
    next(err);
  }
};
