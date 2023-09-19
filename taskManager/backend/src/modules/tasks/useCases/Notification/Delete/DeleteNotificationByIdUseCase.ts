import { inject, injectable } from "tsyringe";
import { INotificationRepository } from "../../../repositories/Interfaces/INotificationRepository";
import { UUID } from "crypto";

@injectable()
export class DeleteNotificationByIdUseCase {
  constructor(
    @inject("NotificationRepository")
    private notificationRepository: INotificationRepository
  ) {}

  async execute(id: string): Promise<void> {
    await this.notificationRepository.deleteById(id);
  }
}
