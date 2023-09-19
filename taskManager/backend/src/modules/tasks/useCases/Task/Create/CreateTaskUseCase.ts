import { inject, injectable } from "tsyringe";
import { AppError } from "../../../../../Errors/AppError";
import { ICreateTaskDTO } from "../../../dtos/ICreateTask.dto";
import { ITaskRepository } from "../../../repositories/Interfaces/ITaskRepository";
@injectable()
export class CreateTaskUseCase {
  constructor(
    @inject("TaskRepository")
    private taskRepository: ITaskRepository
  ) {}

  async execute({
    name,
    description,
    priority,
    conclusion_date,
    status,
    user_id,
  }: ICreateTaskDTO): Promise<void> {
    const taskAlreadyExists = await this.taskRepository.findByName({name, user_id});

    if (taskAlreadyExists) {
      throw new AppError(`Task with name '${name}' already exists!`);
    }

    await this.taskRepository.create({
      name,
      description,
      priority,
      conclusion_date,
      status,
      user_id,
    });
  }
}
