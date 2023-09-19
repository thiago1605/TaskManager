import { Request, Response, NextFunction } from "express";
import { container } from "tsyringe";
import { ListCategoriesByTaskIdUseCase } from "../ListByTaskId/ListByTaskIdUseCase";

export class ListCategoriesByTaskIdController {
  async handle(req: Request, res: Response, next: NextFunction): Promise<void> {
    const { task_id } = req.body;
    console.log(task_id);
    const listCategoriesByTaskId = container.resolve(
      ListCategoriesByTaskIdUseCase
    );

    await listCategoriesByTaskId
      .execute(task_id)
      .then((categories) => res.status(200).json({ categories }))
      .catch((error: Error) => next(error));
  }
}
