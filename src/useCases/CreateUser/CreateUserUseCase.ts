import { UseCase } from "@core/UseCase";
import { User } from "@entities/User";
import { UsersRepository } from "@repositories/UsersRepository";
import { AppError } from "@shared/errors/AppError";
import { CreateUserUseCaseRequest } from "./CreateUserUseCaseRequest";

class CreateUserUseCase implements UseCase<CreateUserUseCaseRequest, User> {
  constructor(private usersRepository: UsersRepository) {}

  async execute({
    name,
    email,
    password,
  }: CreateUserUseCaseRequest): Promise<User> {
    const user = User.create({
      name,
      email,
      password,
    });

    const userByEmail = await this.usersRepository.findByEmail(email);

    if (userByEmail) {
      throw new AppError("E-mail already in user.");
    }

    await this.usersRepository.save(user);

    return user;
  }
}

export { CreateUserUseCase };
