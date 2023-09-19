import { inject, injectable } from "tsyringe";
import { ICategoryRepository } from "../../../repositories/Interfaces/ICategoryRepository";
import { Category } from "../../../entities/Category";

@injectable()
export class FindCategoryByNameUseCase {
  constructor(
    @inject("CategoryRepository")
    private categoryRepository: ICategoryRepository
  ) {}

  async execute({
    name,
    user_id,
  }: {
    name: string;
    user_id: string;
  }): Promise<Category | null> {
    const categories = await this.categoryRepository.findByName({
      name,
      user_id,
    });
    return categories;
  }
}
