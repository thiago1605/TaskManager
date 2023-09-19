import { inject, injectable } from "tsyringe";
import { AppError } from "../../../../../Errors/AppError";
import { ICreateGoalDTO } from "../../../dtos/ICreateGoal.dto";
import { IGoalRepository } from "../../../repositories/Interfaces/IGoalRepository";
import { IUserRepository } from "../../../../accounts/repositories/interfaces/IUserRepository";

@injectable()
export class CreateGoalUseCase {
  constructor(
    @inject("GoalRepository")
    private goalRepository: IGoalRepository,
    @inject("UserRepository") private userRpository: IUserRepository
  ) {}

  async execute({
    conclusion_date,
    description,
    name,
    user_id,
  }: ICreateGoalDTO): Promise<void> {
    const user = await this.userRpository.findById(user_id);

    if (!user)
      throw new AppError(`User with id ${user_id} does not exists!`, 404);

    await this.goalRepository.create({
      conclusion_date,
      description,
      name,
      user_id,
    });
  }
}
