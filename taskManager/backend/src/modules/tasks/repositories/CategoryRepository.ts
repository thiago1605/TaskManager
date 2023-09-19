import { Category } from "../entities/Category";
import { db } from "../../../dataBase";
import { ICreateCategoryDTO } from "../dtos/ICreateCategory.dto";
import { ICategoryRepository } from "./Interfaces/ICategoryRepository";

export class CategoryRepository implements ICategoryRepository {
  private dataBase;

  constructor() {
    this.dataBase = db;
  }

  async create({
    name,
    description,
    user_id,
  }: ICreateCategoryDTO): Promise<void> {
    const query = `
        INSERT INTO "Category" (name, description, user_id)
        VALUES ($1, $2, $3)
    `;

    await (await this.dataBase).none(query, [name, description, user_id]);
  }

  async findById(id: string): Promise<Category | null> {
    const query = `SELECT * FROM "Category" WHERE id = $1`;
    const categoryData = await (await this.dataBase).oneOrNone(query, [id]);

    return categoryData ? Object.assign(new Category(), categoryData) : null;
  }

  async findByName({
    name,
    user_id,
  }: {
    name: string;
    user_id: string;
  }): Promise<Category | null> {
    const query = `SELECT * FROM "Category" WHERE name ILIKE $1 AND user_id = $2`;
    const categoryData = await (
      await this.dataBase
    ).oneOrNone(query, [name, user_id]);

    return categoryData ? Object.assign(new Category(), categoryData) : null;
  }

  async findByUserId(user_id: string): Promise<Category[] | null> {
    const query = `SELECT * FROM "Category" WHERE userId = $1`;
    const categoryData = await (await this.dataBase).any(query, [user_id]);

    return categoryData && categoryData.length > 0
      ? categoryData.map((data) => Object.assign(new Category(), data))
      : null;
  }

  async listByUserId(user_id: string): Promise<Category[] | null> {
    const query = `SELECT * FROM "Category" WHERE user_id = $1`;
    const categoriesData = await (await this.dataBase).any(query, [user_id]);

    return categoriesData && categoriesData.length > 0
      ? categoriesData.map((data: Category) =>
          Object.assign(new Category(), data)
        )
      : null;
  }

  async listByTaskId(task_id: string): Promise<Category[]> {
    console.log(task_id);
    const query = `SELECT c.*
      FROM "Category" AS c
      JOIN "Task_Category" AS tc ON c.name = tc.category_name AND c.user_id = tc.user_id
      WHERE tc.task_id = $1;
    `;
    const categoriesData = await (await this.dataBase).any(query, [task_id]);

    const categories = categoriesData.map((data: Category) =>
      Object.assign(new Category(), data)
    );

    return categories;
  }
}
