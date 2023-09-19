import { Request, Response, NextFunction } from "express"; // Se estiver usando o Express
import { container } from "tsyringe";
import { AppError } from "../Errors/AppError";
import { IUserRepository } from "../modules/accounts/repositories/interfaces/IUserRepository";
import { UUID } from "crypto";

export const checkUserIdExists = async (
  req: Request,
  _res: Response,
  next: NextFunction
): Promise<void> => {
  const { user_id }: { user_id: UUID } = req.body;
  const userRepository = container.resolve<IUserRepository>("UserRepository");
  const user = await userRepository.findById(user_id);

  if (!user) throw new AppError(`User with id ${user_id} does not exist!`, 404);

  next();
};
