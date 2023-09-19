import { Request, Response, NextFunction } from "express";
import { ListCategoriesByUserIdUseCase } from "./ListCategoriesByUserIdUseCase";
import { container } from "tsyringe";

export class ListCategoriesByUserIdController {
  async handle(req: Request, res: Response, next: NextFunction): Promise<void> {
    const { user_id } = req.params;

    const listCategoriesUserIdUseCase = container.resolve(
      ListCategoriesByUserIdUseCase
    );

    await listCategoriesUserIdUseCase
      .execute(user_id)
      .then((categories) => res.status(200).json({ categories }))
      .catch((error: Error) => next(error));
  }
}
