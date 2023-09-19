import { UUID } from "crypto";

export interface IShareTaskDTO {
  task_id: UUID;
  user_sender_id: UUID;
  email: string;
}
