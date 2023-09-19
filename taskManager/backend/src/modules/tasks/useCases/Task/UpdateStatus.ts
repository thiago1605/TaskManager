import { NextFunction, Request, Response } from "express";
import { TaskRepository } from "../../repositories/TaskRepository";

export class SetTaskStatusController {
  async handle(req: Request, res: Response, next: NextFunction): Promise<void> {
    const { task_id, status } = req.body;

    await new TaskRepository()
      .setTaskStatus({
        task_id,
        status,
      })
      .then(() => res.status(201).send())
      .catch((error: Error) => next(error));
  }
}
