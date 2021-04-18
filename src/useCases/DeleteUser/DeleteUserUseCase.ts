import { UseCase } from "@core/UseCase";
import { UsersRepository } from "@repositories/UsersRepository";
import { AppError } from "@shared/errors/AppError";

interface DeleteUserUseCaseRequest {
  userId: string;
}

class DeleteUserUseCase implements UseCase<DeleteUserUseCaseRequest, void> {
  constructor(private usersRepository: UsersRepository) {}

  async execute({ userId }: DeleteUserUseCaseRequest): Promise<void> {
    const user = await this.usersRepository.findById(userId);

    if (!user) {
      throw new AppError("User not found.");
    }

    await this.usersRepository.delete(userId);
  }
}

export { DeleteUserUseCase };
