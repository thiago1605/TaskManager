import { Request, Response, NextFunction } from "express";
import { container } from "tsyringe";
import { ListSharedTasksByUserReceiverIdUseCase } from "./ListSharedTasksByUserReceiverIdUseCase";
import { UUID } from "crypto";

export class ListSharedTasksByUserReceiverIdController {
  async handle(req: Request, res: Response, next: NextFunction): Promise<void> {
    const { user_id } = req.params;


    const listSharedTasksByUserReceiverIdUseCase = container.resolve(
      ListSharedTasksByUserReceiverIdUseCase
    );

    await listSharedTasksByUserReceiverIdUseCase
      .execute(user_id)
      .then((sharedTasks) => res.status(200).json({ sharedTasks }))
      .catch((error: Error) => next(error));
  }
}
