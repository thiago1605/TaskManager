import { UUID } from "crypto";

export class Notification {
  id!: UUID;
  name!: string;
  createdAt!: Date;
  user_id!: UUID;
  task_id!: UUID;
}
