import { inject, injectable } from "tsyringe";
import { Category } from "../../../entities/Category";
import { ITaskRepository } from "../../../repositories/Interfaces/ITaskRepository";

@injectable()
export class FindTaskByNameUseCase {
  constructor(
    @inject("TaskRepository")
    private taskRepository: ITaskRepository
  ) {}

  async execute({
    name,
    user_id,
  }: {
    name: string;
    user_id: string;
  }): Promise<Category | null> {
    const task = await this.taskRepository.findByName({ name, user_id });
    return task;
  }
}
