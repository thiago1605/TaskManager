import { NextFunction, Request, Response } from "express";
import { container } from "tsyringe";
import { AuthenticateUserUseCase } from "./AuthenticateUserUseCase";

export class AuthenticateUserController {
  async handle(
    { body }: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    const { email, password } = body;
    const authenticateUseCase = container.resolve(AuthenticateUserUseCase);

    await authenticateUseCase
      .execute({ email, password })
      .then((token) => res.status(200).json(token))
      .catch((error: Error) => next(error));
  }
}
