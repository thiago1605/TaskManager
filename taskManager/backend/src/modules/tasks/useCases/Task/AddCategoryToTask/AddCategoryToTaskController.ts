import { NextFunction, Request, Response } from "express";
import { container } from "tsyringe";
import { IAddCategoryToTaskDTO } from "../../../dtos/IAddCategoryToTask.dto";
import { AddCategoryToTaskUseCase } from "./AddCategoryToTaskUseCase";

export class AddCategoryToTaskController {
  async handle(req: Request, res: Response, next: NextFunction): Promise<void> {
    const { task_id, category_name, user_id }: IAddCategoryToTaskDTO = req.body;
    

    const addCategoryToTaskUseCase= container.resolve(AddCategoryToTaskUseCase);

    await addCategoryToTaskUseCase
      .execute({task_id, category_name, user_id})
      .then(() => res.status(201).send())
      .catch((error: Error) => next(error));
  }
}
