import { Request, Response, NextFunction } from "express";
import { container } from "tsyringe";
import { ListNotificationsByUserIdUseCase } from "./ListNotificationsByUserIdUseCase";

export class ListNotificationsByUserIdController {
  async handle(req: Request, res: Response, next: NextFunction): Promise<void> {
    const { user_id } = req.params;

    const listNotificationsByUserIdUseCase = container.resolve(
      ListNotificationsByUserIdUseCase
    );

    await listNotificationsByUserIdUseCase
      .execute(user_id)
      .then((notifications) => res.status(200).json({ notifications }))
      .catch((error: Error) => next(error));
  }
}
