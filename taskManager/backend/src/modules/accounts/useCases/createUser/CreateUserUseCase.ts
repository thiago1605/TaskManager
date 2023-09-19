import { inject, injectable } from "tsyringe";
import { hash } from "bcrypt";

import { AppError } from "../../../../Errors/AppError";
import { IUserRepository } from "../../repositories/interfaces/IUserRepository";
import { ICreateUserDTO } from "../../dtos/ICreateUserDTO";

@injectable()
export class CreateUserUseCase {
  constructor(
    @inject("UserRepository")
    private usersRepository: IUserRepository
  ) {}

  async execute({
    name,
    email,
    password,
    picture_path,
  }: ICreateUserDTO): Promise<void> {
    const passwordHash = await hash(password, 8);

    const userAlreadyExists = await this.usersRepository.findByEmail(email);

    if (userAlreadyExists)
      throw new AppError(`User with email '${email}' already exists!`);

    await this.usersRepository.create({
      name,
      email,
      password: passwordHash,
      picture_path,
    });
  }
}
