import { inject, injectable } from "tsyringe";
import { ICategoryRepository } from "../../../repositories/Interfaces/ICategoryRepository";
import { Category } from "../../../entities/Category";

@injectable()
export class ListCategoriesByTaskIdUseCase {
  constructor(
    @inject("CategoryRepository")
    private categoryRepository: ICategoryRepository
  ) {}

  async execute(task_id: string): Promise<Category[] | null> {
    console.log(task_id);
    const categories = await this.categoryRepository.listByTaskId(task_id);

    return categories;
  }
}
