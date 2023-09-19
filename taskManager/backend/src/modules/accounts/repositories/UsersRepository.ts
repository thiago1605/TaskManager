import { ICreateUserDTO } from "../dtos/ICreateUserDTO";
import { IUserRepository } from "./interfaces/IUserRepository";
import { User } from "../entities/User";
import { db } from "../../../dataBase";

export class UserRepository implements IUserRepository {
  private dataBase;

  constructor() {
    this.dataBase = db;
  }

  async create({
    name,
    email,
    password,
    picture_path,
  }: ICreateUserDTO): Promise<void> {
    const query = `
        INSERT INTO "User" (name, email, password, picture_path)
        VALUES ($1, $2, $3, $4)
      `;

    await (
      await this.dataBase
    ).none(query, [name, email, password, picture_path]);
  }

  async findByEmail(email: string): Promise<User | null> {
    const query = `SELECT * FROM "User" WHERE email = $1`;
    const userData = await (await this.dataBase).oneOrNone(query, [email]);

    return userData ? Object.assign(new User(), userData) : null;
  }

  async findById(id: string): Promise<User | null> {
    const query = `SELECT * FROM "User" WHERE id = $1`;
    const userData = await (await this.dataBase).oneOrNone(query, [id]);

    return userData ? Object.assign(new User(), userData) : null;
  }
}
