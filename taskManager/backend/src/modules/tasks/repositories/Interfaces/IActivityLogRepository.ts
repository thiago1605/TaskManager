import { ActivityLog } from "../../entities/ActivityLog";

export interface IActivityLogRepository {
  listByUserId(userId: string): Promise<Array<ActivityLog>>;
}
