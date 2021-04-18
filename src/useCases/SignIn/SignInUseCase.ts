import { UseCase } from "@core/UseCase";
import { User } from "@entities/User";
import { UsersRepository } from "@repositories/UsersRepository";
import { AppError } from "@shared/errors/AppError";
import { AuthTokenProvider } from "@shared/providers/AuthTokenProvider/AuthTokenProvider";

interface SignInUseCaseRequest {
  email: string;
  password: string;
}

interface SignInUseCaseResponse {
  accessToken: string;
  user: User;
}

class SignInUseCase
  implements UseCase<SignInUseCaseRequest, SignInUseCaseResponse> {
  constructor(
    private usersRepository: UsersRepository,
    private authTokenProvider: AuthTokenProvider
  ) {}

  async execute({
    email,
    password,
  }: SignInUseCaseRequest): Promise<SignInUseCaseResponse> {
    const user = await this.usersRepository.findByEmail(email);

    if (!user) {
      throw new AppError("Credentials are incorrect.");
    }

    if (user.password !== password) {
      throw new AppError("Credentials are incorrect.");
    }

    const accessToken = this.authTokenProvider.generate({
      userId: user.id,
    });

    return {
      accessToken,
      user,
    };
  }
}

export { SignInUseCase };
