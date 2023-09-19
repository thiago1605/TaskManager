import { UUID } from "crypto";

export interface ICreateGoalDTO {
  name: string;
  description: string;
  conclusion_date: Date;
  user_id: UUID;
}
