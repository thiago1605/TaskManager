import { inject, injectable } from "tsyringe";
import { INotificationRepository } from "../../../repositories/Interfaces/INotificationRepository";
import { UUID } from "crypto";

@injectable()
export class ListNotificationsByUserIdUseCase {
  constructor(
    @inject("NotificationRepository")
    private notificationRepository: INotificationRepository
  ) {}

  async execute(user_id: string): Promise<Notification[] | null> {
    const notifications = await this.notificationRepository.listByUserId(
      user_id
    );
    return notifications ?? null;
  }
}
