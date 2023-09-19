import { Request, Response, NextFunction } from "express";
import { CreateGoalUseCase } from "./CreateGoalUseCase";
import { container } from "tsyringe";
import { ICreateGoalDTO } from "../../../dtos/ICreateGoal.dto";

export class CreateGoalController {
  async handle(req: Request, res: Response, next: NextFunction): Promise<void> {
    const { user_id, conclusion_date, description, name }: ICreateGoalDTO =
      req.body;

    const createGoalUseCase = container.resolve(CreateGoalUseCase);

    await createGoalUseCase
      .execute({ user_id, conclusion_date, description, name })
      .then(() => res.status(201).send())
      .catch((error: Error) => next(error));
  }
}
