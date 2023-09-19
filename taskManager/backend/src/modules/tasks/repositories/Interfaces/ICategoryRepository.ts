import { ICreateCategoryDTO } from "../../dtos/ICreateCategory.dto";
import { Category } from "../../entities/Category";

export interface ICategoryRepository {
  create(data: ICreateCategoryDTO): Promise<void>;
  findByName({
    name,
    user_id,
  }: {
    name: string;
    user_id: string;
  }): Promise<Category | null>;
  listByUserId(user_id: string): Promise<Category[] | null>;
  listByTaskId(task_id: string): Promise<Category[] | null>;
}
