import { inject, injectable } from "tsyringe";
import { compare } from "bcrypt";
import { sign } from "jsonwebtoken";
import { AppError } from "../../../../Errors/AppError";
import { IUserRepository } from "../../repositories/interfaces/IUserRepository";
import { UUID } from "crypto";

interface IRequest {
  email: string;
  password: string;
}

interface IResponse {
  token: string;
  user: {
    email: string;
    user_id: string;
  };
}

@injectable()
export class AuthenticateUserUseCase {
  private tokenKey: string | undefined;

  constructor(
    @inject("UserRepository")
    private userRepository: IUserRepository
  ) {
    this.tokenKey = process.env.TOKEN_KEY;
  }

  async execute({ email, password }: IRequest) {
    const user = await this.userRepository.findByEmail(email);

    if (!user) throw new AppError("Email or password incorrect!", 404);

    const passwordMatch = await compare(password, user.password);

    if (!passwordMatch) throw new AppError("Email or password incorrect!", 401);

    const token = sign({}, String(this.tokenKey), {
      subject: user.id,
      expiresIn: "1d",
    });

    const tokenReturn: IResponse = {
      token,
      user: {
        email: user.email,
        user_id: user.id,
      },
    };

    return tokenReturn;
  }
}
