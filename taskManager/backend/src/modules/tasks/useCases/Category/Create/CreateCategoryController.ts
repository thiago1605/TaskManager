import { NextFunction, Request, Response } from "express";
import { container } from "tsyringe";
import { CreateCategoryUseCase } from "./CreateCategoryUseCase";
import { ICreateCategoryDTO } from "../../../dtos/ICreateCategory.dto";

export class CreateCategoryController {
  async handle(req: Request, res: Response, next: NextFunction): Promise<void> {
    const { name, description, user_id }: ICreateCategoryDTO = req.body;

    const createCategoryUseCase = container.resolve(CreateCategoryUseCase);

    await createCategoryUseCase
      .execute({
        name,
        description,
        user_id,
      })
      .then(() => res.status(201).send())
      .catch((error: Error) => next(error));
  }
}
