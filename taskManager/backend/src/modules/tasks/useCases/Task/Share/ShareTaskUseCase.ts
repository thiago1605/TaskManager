import { inject, injectable } from "tsyringe";
import { ITaskRepository } from "../../../repositories/Interfaces/ITaskRepository";
import { IShareTaskDTO } from "../../../dtos/IShareTask.dto";
import { AppError } from "../../../../../Errors/AppError";
import { IUserRepository } from "../../../../accounts/repositories/interfaces/IUserRepository";

@injectable()
export class ShareTaskUseCase {
  constructor(
    @inject("TaskRepository")
    private taskRepository: ITaskRepository,
    @inject("UserRepository")
    private userRepository: IUserRepository
  ) {}

  async execute({
    task_id,
    email,
    user_sender_id,
  }: IShareTaskDTO): Promise<void> {
    const task = await this.taskRepository.findById(task_id);
    const userSender = await this.userRepository.findById(user_sender_id);

    if (!task)
      throw new AppError(`Task with id '${task_id}' does not exists!`, 404);
    if (!userSender)
      throw new AppError(
        `user_sender_id with id '${user_sender_id}' does not exists!`,
        404
      );

    await this.taskRepository.shareWithAnotherUser({
      task_id,
      email,
      user_sender_id,
    });
  }
}
