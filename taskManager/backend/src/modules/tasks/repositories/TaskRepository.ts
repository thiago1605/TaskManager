import { Task } from "../entities/Task";
import { db } from "../../../dataBase";
import { ICreateTaskDTO } from "../dtos/ICreateTask.dto";
import { ITaskRepository } from "./Interfaces/ITaskRepository";
import { IAddCategoryToTaskDTO } from "../dtos/IAddCategoryToTask.dto";
import { IShareTaskDTO } from "../dtos/IShareTask.dto";
import { ISetSharedTaskStatusDTO } from "../dtos/ISetTaskSharedStatus.dto";
import { UUID } from "crypto";
import { AppError } from "../../../Errors/AppError";

export class TaskRepository implements ITaskRepository {
  private dataBase;

  constructor() {
    this.dataBase = db;
  }

  async create({
    name,
    description,
    priority,
    conclusion_date,
    status,
    user_id,
  }: ICreateTaskDTO): Promise<void> {
    const query = `
        INSERT INTO "Task" (name, description, priority, conclusion_date, status, user_id)
        VALUES ($1, $2, $3, $4, $5, $6);
    `;

    await (
      await this.dataBase
    ).none(query, [
      name,
      description,
      priority,
      conclusion_date,
      status,
      user_id,
    ]);
  }

  async findById(id: string): Promise<Task | null> {
    const query = `SELECT * FROM "Task" WHERE id = $1`;
    const taskData = await (await this.dataBase).oneOrNone(query, [id]);

    return taskData ? Object.assign(new Task(), taskData) : null;
  }

  async findByName({
    name,
    user_id,
  }: {
    name: string;
    user_id: string;
  }): Promise<Task | null> {
    const query = `SELECT * FROM "Task" WHERE name ILIKE $1 AND user_id = $2`;
    const taskData = await (
      await this.dataBase
    ).oneOrNone(query, [name, user_id]);

    return taskData ? Object.assign(new Task(), taskData) : null;
  }

  async listByUserId(userId: string): Promise<Task[] | null> {
    const query = `SELECT * FROM "Task" WHERE user_id = $1`;
    const taskData = await (await this.dataBase).any(query, [userId]);

    return taskData && taskData.length > 0
      ? taskData.map((data: Task) => Object.assign(new Task(), data))
      : null;
  }

  async addCategory({
    task_id,
    category_name,
    user_id,
  }: IAddCategoryToTaskDTO): Promise<void> {
    const query = `
    INSERT INTO "Task_Category" (task_id, category_name, user_id)
    VALUES ($1, $2, $3);
  `;

    await (await this.dataBase).none(query, [task_id, category_name, user_id]);
  }

  async alreadyExistsTaskCategory({
    task_id,
    category_name,
    user_id,
  }: IAddCategoryToTaskDTO): Promise<boolean> {
    const query = `
      SELECT *
      FROM "Task_Category"
      WHERE task_id = $1 AND category_name = $2 AND user_id = $3;
    `;

    const taskCategoryData = await (
      await this.dataBase
    ).oneOrNone(query, [task_id, category_name, user_id]);

    return taskCategoryData ? true : false;
  }

  async shareWithAnotherUser({
    task_id,
    user_sender_id,
    email,
  }: IShareTaskDTO): Promise<void> {
    const query2 = `SELECT id FROM "User" WHERE email = $1`;
    const query = `INSERT INTO "Task_Sharing" (task_id, user_sender_id, user_receiver_id) VALUES ($1, $2, $3) `;

    const user_receiver_id = await (await this.dataBase).one(query2, [email]);

    if (!user_receiver_id)
      throw new AppError(`User with email '${email}' does not exists!`, 404);

    await (
      await this.dataBase
    ).none(query, [task_id, user_sender_id, user_receiver_id.id]);
  }

  async setTaskSharedStatus({
    status,
    task_id,
    user_receiver_id,
    user_sender_id,
  }: ISetSharedTaskStatusDTO): Promise<void> {
    const query = `UPDATE "Task_Sharing" SET status = $1 WHERE task_id = $2 AND user_sender_id = $3 AND user_receiver_id = $4`;

    await (
      await this.dataBase
    ).none(query, [status, task_id, user_sender_id, user_receiver_id]);
  }

  async ListSharedTasksByUserReceiverId(
    user_receiver_id: UUID
  ): Promise<Task[] | null> {
    const query = `SELECT t.*, u.name as user_sender_name
    FROM "Task" AS t
    JOIN "Task_Sharing" AS ts ON t.id = ts.task_id
    LEFT JOIN "User" AS u ON ts.user_sender_id = u.id
    WHERE ts.user_receiver_id = $1 AND (ts.status = 'accepted' OR ts.status IS NULL)`;

    const taskData = await (await this.dataBase).any(query, [user_receiver_id]);

    return taskData && taskData.length > 0
      ? taskData.map((data: Task) => Object.assign(new Task(), data))
      : null;
  }

  async FindTaskSharedByUser({
    email,
    user_sender_id,
    task_id,
  }: IShareTaskDTO): Promise<boolean> {
    const query2 = `SELECT id FROM "User" WHERE email = $1`;
    const query = `SELECT *
    FROM "Task_Sharing"
    WHERE user_sender_id = $1 AND user_receiver_id = $2 AND task_id = $3;
    `;

    const user_receiver_id = await (await this.dataBase).none(query2, [email]);

    const taskData = await (
      await this.dataBase
    ).any(query, [user_sender_id, user_receiver_id, task_id]);

    return taskData ? true : false;
  }

  async getTasksTotalPerStatusByUserId(userId: UUID): Promise<any> {
    const query = `
      SELECT status, TasksTotal
      FROM TasksTotalPerStatus
      WHERE user_id = $1;
    `;

    const taskStatusData = await (await this.dataBase).any(query, [userId]);

    return taskStatusData;
  }

  async setTaskStatus({ status, task_id }: any): Promise<void> {
    const query = `UPDATE "Task" SET status = $1 WHERE id = $2;`;

    await (await this.dataBase).none(query, [status, task_id]);
  }
}
