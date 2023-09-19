import { NextFunction, Request, Response } from "express";
import { ICreateUsersDTO } from "../../dtos/ICreateUserDTO";
import { container } from "tsyringe";
import { CreateUserUseCase } from "./CreateUserUseCase";

export class CreateUserController {
  async handle(req: Request, res: Response, next: NextFunction): Promise<void> {
    const { email, name, password, picture_path }: ICreateUsersDTO = req.body;

    const createUserUseCase = container.resolve(CreateUserUseCase);

    await createUserUseCase
      .execute({
        email,
        name,
        password,
        picture_path,
      })
      .then(() => res.status(201).send())
      .catch((error: Error) => next(error));
  }
}
