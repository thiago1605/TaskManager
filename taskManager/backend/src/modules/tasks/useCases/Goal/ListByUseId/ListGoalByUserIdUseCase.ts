import { inject, injectable } from "tsyringe";
import { IGoalRepository } from "../../../repositories/Interfaces/IGoalRepository";
import { Goal } from "../../../entities/Goal";

@injectable()
export class ListGoalsByUserIdUseCase {
  constructor(
    @inject("GoalRepository")
    private goalRepository: IGoalRepository
  ) {}

  async execute(user_id: string): Promise<Goal[] | null> {
    const goals = await this.goalRepository.listGoalsByUserId(user_id);
    return goals;
  }
}
