import { UUID } from "crypto";

export class Goal {
  id!: UUID;
  name!: string;
  description!: string;
  conclusion_date!: Date;
  created_at!: Date;
}
