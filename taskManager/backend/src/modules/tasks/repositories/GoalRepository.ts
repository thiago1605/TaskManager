import { UUID } from "crypto";
import { db } from "../../../dataBase";
import { ICreateGoalDTO } from "../dtos/ICreateGoal.dto";
import { Goal } from "../entities/Goal";
import { IGoalRepository } from "./Interfaces/IGoalRepository";
import { IRemoveGoalDTO } from "../dtos/IRemoveGoal.dto";

export class GoalRepository implements IGoalRepository {
  private dataBase;

  constructor() {
    this.dataBase = db;
  }

  async create({
    user_id,
    conclusion_date,
    description,
    name,
  }: ICreateGoalDTO): Promise<void> {
    const query = `
          INSERT INTO "Goal" (user_id, conclusion_date, description, name)
          VALUES ($1, $2, $3, $4);
        `;

    await (
      await this.dataBase
    ).none(query, [user_id, conclusion_date, description, name]);
  }

  async listGoalsByUserId(user_id: string): Promise<Goal[] | null> {
    const query = `
      SELECT * FROM "Goal"
      WHERE user_id = $1;
    `;

    const goals = await (await this.dataBase).any(query, [user_id]);
    return goals || null;
  }

  async deleteGoalByUserId({id, user_id}: IRemoveGoalDTO): Promise<void> {
    const query = `
      DELETE FROM "Goal"
      WHERE id = $1 AND user_id = $2;
    `;

    await (await this.dataBase).none(query, [id, user_id]);
  }
}
