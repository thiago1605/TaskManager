import { UUID } from "crypto";

export interface ICreateNoficationDTO {
  name: string;
  user_id: UUID;
  task_id: UUID;
}
