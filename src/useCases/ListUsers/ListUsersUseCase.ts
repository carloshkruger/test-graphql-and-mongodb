import { UseCase } from "@core/UseCase";
import { User } from "@entities/User";
import { UsersRepository } from "@repositories/UsersRepository";

class ListUsersUseCase implements UseCase<void, User[]> {
  constructor(private usersRepository: UsersRepository) {}

  async execute(): Promise<User[]> {
    const users = await this.usersRepository.findAll();

    return users;
  }
}

export { ListUsersUseCase };
