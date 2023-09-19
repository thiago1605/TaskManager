import { inject, injectable } from "tsyringe";
import { ITaskRepository } from "../../../repositories/Interfaces/ITaskRepository";
import { AppError } from "../../../../../Errors/AppError";
import { ISetSharedTaskStatusDTO } from "../../../dtos/ISetTaskSharedStatus.dto";
import { IUserRepository } from "../../../../accounts/repositories/interfaces/IUserRepository";

@injectable()
export class SetSharedTaskStatusUseCase {
  constructor(
    @inject("TaskRepository")
    private taskRepository: ITaskRepository,
    @inject("UserRepository")
    private userRepository: IUserRepository
  ) {}

  async execute({
    task_id,
    status,
    user_receiver_id,
    user_sender_id,
  }: ISetSharedTaskStatusDTO): Promise<void> {
    const task = await this.taskRepository.findById(task_id);
    const userSender = await this.userRepository.findById(user_sender_id);
    const userReceiver = await this.userRepository.findById(user_receiver_id);

    if (!task)
      throw new AppError(`Task with id '${task_id}' does not exists!`, 404);

    if (!userSender)
      throw new AppError(
        `user_sender_id with id '${user_sender_id}' does not exists!`,
        404
      );

    if (!userReceiver)
      throw new AppError(
        `user_receiver_id '${user_receiver_id}' does not exists!`,
        404
      );

    if (status !== "refused" && status !== "accepted")
      throw new AppError("'status' must be 'accept' or 'refused'!");

    await this.taskRepository.setTaskSharedStatus({
      task_id,
      status,
      user_receiver_id,
      user_sender_id,
    });
  }
}
