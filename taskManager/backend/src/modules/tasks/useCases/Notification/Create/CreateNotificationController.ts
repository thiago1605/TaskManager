import { Request, Response, NextFunction } from "express";
import { container } from "tsyringe";
import { ICreateNoficationDTO } from "../../../dtos/ICreateNotification.dto";
import { CreateNotificationUseCase } from "./CreateNotificationUseCase";

export class CreateNotificationController {
  async handle(req: Request, res: Response, next: NextFunction): Promise<void> {
    const { name, task_id, user_id }: ICreateNoficationDTO = req.body;

    const createNotificationUseCase = container.resolve(
      CreateNotificationUseCase
    );

    await createNotificationUseCase
      .execute({ name, task_id, user_id })
      .then(() => res.status(201).send())
      .catch((error: Error) => next(error));
  }
}
