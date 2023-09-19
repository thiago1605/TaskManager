import { Request, Response, NextFunction } from "express";
import { container } from "tsyringe";
import { DeleteGoalByUserIdUseCase } from "./DeleteGoalByUserIdUserCase";

export class DeleteGoalByUserIdController {
  async handle(req: Request, res: Response, next: NextFunction): Promise<void> {
    const { user_id, id } = req.body;

    const deleteGoalByUserIdUseCase = container.resolve(
      DeleteGoalByUserIdUseCase
    );

    await deleteGoalByUserIdUseCase
      .execute({ id, user_id })
      .then(() => res.status(204).send())
      .catch((error: Error) => next(error));
  }
}
