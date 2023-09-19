import { UUID } from "crypto";
import { ICreateNoficationDTO } from "../dtos/ICreateNotification.dto";
import { db } from "../../../dataBase";
import { INotificationRepository } from "./Interfaces/INotificationRepository";

export class NotificationRepository implements INotificationRepository {
  private dataBase;

  constructor() {
    this.dataBase = db;
  }

  async create({
    name,
    task_id,
    user_id,
  }: ICreateNoficationDTO): Promise<void> {
    const query = `INSERT INTO "Notification" (name, task_id, user_id)
    VALUES ($1, $2, $3);
    `;

    await (await this.dataBase).none(query, [name, task_id, user_id]);
  }

  async listByUserId(user_id: UUID): Promise<Notification[] | null> {
    const query = `
      SELECT * FROM "Notification"
      WHERE user_id = $1;
    `;
    const notifications = await (await this.dataBase).any(query, [user_id]);
    return notifications ?? null;
  }

  async deleteById(id: UUID): Promise<void> {
    const query = `
    DELETE FROM "Notification"
    WHERE id = $1;
  `;

    await (await this.dataBase).none(query, [id]);
  }
}
