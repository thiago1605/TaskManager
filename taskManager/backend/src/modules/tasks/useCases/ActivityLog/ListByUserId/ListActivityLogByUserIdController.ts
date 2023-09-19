import { Request, Response, NextFunction } from "express";
import { ListActivityLogByUserIdUseCase } from "./ListActivityLogByUserIdUseCase";
import { container } from "tsyringe";

export class ListActivityLogByUserIdController {
  async handle(req: Request, res: Response, next: NextFunction): Promise<void> {
    const { user_id } = req.body;

    const createCategoryUseCase = container.resolve(
      ListActivityLogByUserIdUseCase
    );

    await createCategoryUseCase
      .execute(user_id)
      .then((activity_logs) => res.status(200).json({ activity_logs }))
      .catch((error: Error) => next(error));
  }
}
