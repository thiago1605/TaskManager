import { db } from "../../../dataBase";
import { ActivityLog } from "../entities/ActivityLog";
import { IActivityLogRepository } from "./Interfaces/IActivityLogRepository";

export class ActivityLogRepository implements IActivityLogRepository {
  private dataBase;

  constructor() {
    this.dataBase = db;
  }

  async listByUserId(userId: string): Promise<ActivityLog[]> {
    const query = `SELECT * FROM "Activity_Log" WHERE user_id = $1`;
    const activity_Logs = await (await this.dataBase).any(query, [userId]);

    return activity_Logs ?? null;
  }
}
