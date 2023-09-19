import { Request, Response, NextFunction } from "express";
import { container } from "tsyringe";
import { ListGoalsByUserIdUseCase } from "./ListGoalByUserIdUseCase";

export class ListGoalsByUserIdController {
  async handle(req: Request, res: Response, next: NextFunction): Promise<void> {
    const { user_id } = req.params;

    const listGoalsByUserIdUseCase = container.resolve(
      ListGoalsByUserIdUseCase
    );

    await listGoalsByUserIdUseCase
      .execute(user_id)
      .then((goals) => res.status(200).json({ goals }))
      .catch((error: Error) => next(error));
  }
}
