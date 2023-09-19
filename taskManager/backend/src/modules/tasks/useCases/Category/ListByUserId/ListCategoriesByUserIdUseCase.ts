import { inject, injectable } from "tsyringe";
import { ICategoryRepository } from "../../../repositories/Interfaces/ICategoryRepository";
import { Category } from "../../../entities/Category";

@injectable()
export class ListCategoriesByUserIdUseCase {
  constructor(
    @inject("CategoryRepository")
    private categoryRepository: ICategoryRepository
  ) {}

  async execute(user_id: string): Promise<Category[] | null> {
    const categories = await this.categoryRepository.listByUserId(user_id);
    return categories;
  }
}
