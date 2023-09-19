import { ICreateGoalDTO } from "../../dtos/ICreateGoal.dto";
import { IRemoveGoalDTO } from "../../dtos/IRemoveGoal.dto";
import { Goal } from "../../entities/Goal";

export interface IGoalRepository {
  create(data: ICreateGoalDTO): Promise<void>;
  listGoalsByUserId(user_id: string): Promise<Goal[] | null>;
  deleteGoalByUserId(data: IRemoveGoalDTO): Promise<void>;
}
