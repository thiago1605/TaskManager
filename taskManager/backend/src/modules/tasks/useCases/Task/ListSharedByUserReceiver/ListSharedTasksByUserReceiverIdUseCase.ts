import { inject, injectable } from "tsyringe";
import { ITaskRepository } from "../../../repositories/Interfaces/ITaskRepository";
import { UUID } from "crypto";
import { Task } from "../../../entities/Task";
import { IUserRepository } from "../../../../accounts/repositories/interfaces/IUserRepository";
import { AppError } from "../../../../../Errors/AppError";

@injectable()
export class ListSharedTasksByUserReceiverIdUseCase {
  constructor(
    @inject("TaskRepository")
    private taskRepository: ITaskRepository,
    @inject("UserRepository")
    private userRepository: IUserRepository
  ) {}

  async execute(user_receiver_id: string): Promise<Task[] | null> {
    const userReceiver = await this.userRepository.findById(user_receiver_id);

    if (!userReceiver)
      throw new AppError(
        `user_receiver_id '${user_receiver_id}' does not exists!`,
        404
      );

    const sharedTasks =
      await this.taskRepository.ListSharedTasksByUserReceiverId(
        user_receiver_id
      );
    return sharedTasks;
  }
}
