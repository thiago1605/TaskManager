import { UUID } from "crypto";
import { IAddCategoryToTaskDTO } from "../../dtos/IAddCategoryToTask.dto";
import { ICreateTaskDTO } from "../../dtos/ICreateTask.dto";
import { ISetSharedTaskStatusDTO } from "../../dtos/ISetTaskSharedStatus.dto";
import { IShareTaskDTO } from "../../dtos/IShareTask.dto";
import { Task } from "../../entities/Task";

export interface ITaskRepository {
  create(data: ICreateTaskDTO): Promise<void>;
  findById(id: string): Promise<Task | null>;
  findByName(data: { name: string; user_id: string }): Promise<Task | null>;
  listByUserId(userId: string): Promise<Task[] | null>;
  addCategory(data: IAddCategoryToTaskDTO): Promise<void>;
  alreadyExistsTaskCategory(data: IAddCategoryToTaskDTO): Promise<boolean>;
  shareWithAnotherUser(data: IShareTaskDTO): Promise<void>;
  setTaskSharedStatus(data: ISetSharedTaskStatusDTO): Promise<void>;
  ListSharedTasksByUserReceiverId(
    user_receiver_id: string
  ): Promise<Task[] | null>;
  FindTaskSharedByUser(data: IShareTaskDTO): Promise<boolean>;
}
