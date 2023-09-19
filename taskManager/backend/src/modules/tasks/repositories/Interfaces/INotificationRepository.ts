import { UUID } from "crypto";
import { ICreateNoficationDTO } from "../../dtos/ICreateNotification.dto";

export interface INotificationRepository {
  create(data: ICreateNoficationDTO): Promise<void>;
  listByUserId(user_id: string): Promise<Notification[] | null>;
  deleteById(id: string): Promise<void>;
}
