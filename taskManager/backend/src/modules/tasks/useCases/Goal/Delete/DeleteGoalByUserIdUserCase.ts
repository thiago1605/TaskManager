import { inject, injectable } from "tsyringe";
import { IGoalRepository } from "../../../repositories/Interfaces/IGoalRepository";
import { IRemoveGoalDTO } from "../../../dtos/IRemoveGoal.dto";

@injectable()
export class DeleteGoalByUserIdUseCase {
  constructor(
    @inject("GoalRepository")
    private goalRepository: IGoalRepository
  ) {}

  async execute({ id, user_id }: IRemoveGoalDTO): Promise<void> {
    await this.goalRepository.deleteGoalByUserId({ id, user_id });
  }
}
