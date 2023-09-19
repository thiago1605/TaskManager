import { UUID } from "crypto";

export interface ISetSharedTaskStatusDTO {
  task_id: UUID;
  status: "refused" | "accepted";
  user_sender_id: UUID;
  user_receiver_id: UUID;
}
