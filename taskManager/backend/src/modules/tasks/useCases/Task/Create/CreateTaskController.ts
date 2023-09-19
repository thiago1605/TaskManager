import { NextFunction, Request, Response } from "express";
import { container } from "tsyringe";
import { CreateTaskUseCase } from "./CreateTaskUseCase";
import { ICreateTaskDTO } from "../../../dtos/ICreateTask.dto";

export class CreateTaskController {
  async handle(req: Request, res: Response, next: NextFunction): Promise<void> {
    const {
      name,
      description,
      priority,
      conclusion_date,
      status,
      user_id,
    }: ICreateTaskDTO = req.body;

    const createTaskUseCase = container.resolve(CreateTaskUseCase);

    await createTaskUseCase
      .execute({
        name,
        description,
        priority,
        conclusion_date,
        status,
        user_id,
      })
      .then(() => res.status(201).send())
      .catch((error: Error) => next(error));
  }
}
