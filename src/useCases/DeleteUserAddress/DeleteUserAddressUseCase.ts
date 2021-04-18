import { UseCase } from "@core/UseCase";
import { UsersRepository } from "@repositories/UsersRepository";
import { AppError } from "@shared/errors/AppError";

interface DeleteUserAddressRequest {
  userId: string;
  addressId: string;
}

class DeleteUserAddressUseCase
  implements UseCase<DeleteUserAddressRequest, void> {
  constructor(private usersRepository: UsersRepository) {}

  async execute({
    userId,
    addressId,
  }: DeleteUserAddressRequest): Promise<void> {
    const user = await this.usersRepository.findById(userId);

    if (!user) {
      throw new AppError("User not found.");
    }

    user.removeAddressById(addressId);

    await this.usersRepository.save(user);
  }
}

export { DeleteUserAddressUseCase };
