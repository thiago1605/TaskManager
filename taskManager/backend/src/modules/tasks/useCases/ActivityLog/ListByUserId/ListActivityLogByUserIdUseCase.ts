import { inject, injectable } from "tsyringe";
import { ActivityLog } from "../../../entities/ActivityLog";
import { IActivityLogRepository } from "../../../repositories/Interfaces/IActivityLogRepository";

@injectable()
export class ListActivityLogByUserIdUseCase {
  constructor(
    @inject("ActivityLogRepository")
    private activityLogRepository: IActivityLogRepository
  ) {}

  async execute(user_id: string): Promise<ActivityLog[]> {
    const activity_Logs = this.activityLogRepository.listByUserId(user_id);
    return activity_Logs;
  }
}
