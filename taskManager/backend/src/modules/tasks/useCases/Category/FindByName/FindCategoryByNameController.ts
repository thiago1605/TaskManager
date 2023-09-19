import { Request, Response, NextFunction } from "express";
import { container } from "tsyringe";
import { FindCategoryByNameUseCase } from "./FindCategoryByNameUseCase";

export class FindCategoryByNameController {
  async handle(req: Request, res: Response, next: NextFunction): Promise<void> {
    const { name, user_id }: { name: string; user_id: string } = req.body;
    const findCategoryByNameUseCase = container.resolve(
      FindCategoryByNameUseCase
    );

    await findCategoryByNameUseCase
      .execute({ user_id, name })
      .then((category) => res.status(200).json({ category }))
      .catch((error: Error) => next(error));
  }
}
