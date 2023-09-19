import { Request, Response, NextFunction } from "express";
import { container } from "tsyringe";
import { ListTasksByUserIdUseCase } from "./ListTasksByUserIdUseCase";

export class ListTasksByUserIdController {
  async handle(req: Request, res: Response, next: NextFunction): Promise<void> {
    const { user_id } = req.params;
    const listTasksByUserIdUseCase = container.resolve(
      ListTasksByUserIdUseCase
    );

    await listTasksByUserIdUseCase
      .execute(user_id)
      .then((tasks) => res.status(200).json({ tasks }))
      .catch((error: Error) => next(error));
  }
}
