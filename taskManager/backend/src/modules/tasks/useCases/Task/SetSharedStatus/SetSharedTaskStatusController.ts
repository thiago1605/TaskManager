import { NextFunction, Request, Response } from "express";
import { container } from "tsyringe";
import { SetSharedTaskStatusUseCase } from "./SetSharedTaskStatusUseCase";
import { ISetSharedTaskStatusDTO } from "../../../dtos/ISetTaskSharedStatus.dto";

export class SetSharedTaskStatusController {
  async handle(req: Request, res: Response, next: NextFunction): Promise<void> {
    const { task_id, status, user_receiver_id, user_sender_id }: ISetSharedTaskStatusDTO = req.body;
    const setSharedTaskStatusUseCase = container.resolve(SetSharedTaskStatusUseCase);

    await setSharedTaskStatusUseCase
      .execute({
        task_id,
        status,
        user_receiver_id,
        user_sender_id
      })
      .then(() => res.status(201).send())
      .catch((error: Error) => next(error));
  }
}
