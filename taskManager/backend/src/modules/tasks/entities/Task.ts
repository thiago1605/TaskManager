export class Task {
  id!: string;
  name!: string;
  description?: string;
  priority!: number;
  status!: "done" | "in_progress" | "stopped";
  conclusion_date!: Date;
  created_at!: Date;
  user_id!: string;
}
