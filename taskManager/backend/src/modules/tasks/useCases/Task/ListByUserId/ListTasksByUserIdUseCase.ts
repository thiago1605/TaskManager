import { inject, injectable } from "tsyringe";
import { ITaskRepository } from "../../../repositories/Interfaces/ITaskRepository";
import { Task } from "../../../entities/Task";

@injectable()
export class ListTasksByUserIdUseCase {
  constructor(
    @inject("TaskRepository")
    private taskRepository: ITaskRepository
  ) {}

  async execute(user_id: string): Promise<Task[] | null> {
    const tasks = await this.taskRepository.listByUserId(user_id);
    return tasks;
  }
}
