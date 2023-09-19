import { inject, injectable } from "tsyringe";
import { INotificationRepository } from "../../../repositories/Interfaces/INotificationRepository";
import { UUID } from "crypto";
import { ICreateNoficationDTO } from "../../../dtos/ICreateNotification.dto";

@injectable()
export class CreateNotificationUseCase {
  constructor(
    @inject("NotificationRepository")
    private notificationRepository: INotificationRepository
  ) {}

  async execute({
    name,
    task_id,
    user_id,
  }: ICreateNoficationDTO): Promise<void> {
    await this.notificationRepository.create({ name, task_id, user_id });
  }
}
