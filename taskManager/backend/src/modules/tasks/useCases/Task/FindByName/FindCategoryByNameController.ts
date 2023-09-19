import { Request, Response, NextFunction } from "express";
import { container } from "tsyringe";
import { FindTaskByNameUseCase } from "./FindTaskByNameUseCase";

export class FindTaskByNameController {
  async handle(req: Request, res: Response, next: NextFunction): Promise<void> {
    const { name, user_id }: { name: string; user_id: string } = req.body;
    const findTaskByNameUseCase = container.resolve(FindTaskByNameUseCase);

    await findTaskByNameUseCase
      .execute({ name, user_id })
      .then((task) => res.status(200).json({ task }))
      .catch((error: Error) => next(error));
  }
}
