import { inject, injectable } from "tsyringe";
import { ITaskRepository } from "../../../repositories/Interfaces/ITaskRepository";
import { IAddCategoryToTaskDTO } from "../../../dtos/IAddCategoryToTask.dto";
import { AppError } from "../../../../../Errors/AppError";
import { ICategoryRepository } from "../../../repositories/Interfaces/ICategoryRepository";

@injectable()
export class AddCategoryToTaskUseCase {
  constructor(
    @inject("TaskRepository") private taskRepository: ITaskRepository,
    @inject("CategoryRepository")
    private categoryRepository: ICategoryRepository
  ) {}

  async execute({
    task_id,
    category_name,
    user_id,
  }: IAddCategoryToTaskDTO): Promise<void> {
    const taskExists = await this.taskRepository.findById(task_id);
    const categoryExists = await this.categoryRepository.findByName({
      name: category_name,
      user_id,
    });

    const alreadyExistsTaskCategory =
      await this.taskRepository.alreadyExistsTaskCategory({
        task_id,
        category_name,
        user_id,
      });

    if (!taskExists)
      throw new AppError(`Task with id '${task_id}' does not exists!`, 404);
    if (!categoryExists)
      throw new AppError(`Category '${category_name}' does not exists!`, 404);
    if (alreadyExistsTaskCategory)
      throw new AppError(`Category '${category_name}' already added to task!`);

    await this.taskRepository.addCategory({
      task_id,
      category_name,
      user_id,
    });
  }
}
