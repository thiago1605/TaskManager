import { Request, Response, NextFunction } from "express";
import { container } from "tsyringe";
import { DeleteNotificationByIdUseCase } from "./DeleteNotificationByIdUseCase";

export class DeleteNotificationByIdController {
  async handle(req: Request, res: Response, next: NextFunction): Promise<void> {
    const { id } = req.params;

    const deleteNotificationByIdUseCase = container.resolve(
      DeleteNotificationByIdUseCase
    );

    await deleteNotificationByIdUseCase
      .execute(id)
      .then(() => res.status(204).send())
      .catch((error: Error) => next(error));
  }
}
