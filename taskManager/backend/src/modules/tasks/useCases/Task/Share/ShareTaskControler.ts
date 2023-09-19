import { NextFunction, Request, Response } from "express";
import { container } from "tsyringe";
import { IShareTaskDTO } from "../../../dtos/IShareTask.dto";
import { ShareTaskUseCase } from "./ShareTaskUseCase";

export class ShareTaskControler {
  async handle(req: Request, res: Response, next: NextFunction): Promise<void> {
    const { task_id, email, user_sender_id }: IShareTaskDTO =
      req.body;

    const shareTaskUseCase = container.resolve(ShareTaskUseCase);

    await shareTaskUseCase
      .execute({
        task_id,
        email,
        user_sender_id,
      })
      .then(() => res.status(201).send())
      .catch((error: Error) => next(error));
  }
}
