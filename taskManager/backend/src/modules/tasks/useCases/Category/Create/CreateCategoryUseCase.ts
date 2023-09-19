import { inject, injectable } from "tsyringe";
import { AppError } from "../../../../../Errors/AppError";
import { ICreateCategoryDTO } from "../../../dtos/ICreateCategory.dto";
import { ICategoryRepository } from "../../../repositories/Interfaces/ICategoryRepository";

@injectable()
export class CreateCategoryUseCase {
  constructor(
    @inject("CategoryRepository")
    private categoryRepository: ICategoryRepository
  ) {}

  async execute({
    name,
    description,
    user_id,
  }: ICreateCategoryDTO): Promise<void> {
    const categoryAlreadyExists = await this.categoryRepository.findByName({
      name,
      user_id,
    });

    if (categoryAlreadyExists)
      throw new AppError(`Category with name '${name}' already exists!`);

    await this.categoryRepository.create({
      name,
      description,
      user_id,
    });
  }
}
