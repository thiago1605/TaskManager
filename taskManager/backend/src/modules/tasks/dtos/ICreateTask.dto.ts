export interface ICreateTaskDTO {
  name: string;
  description?: string;
  priority: number;
  conclusion_date: Date;
  status: string;
  user_id: string;
}
