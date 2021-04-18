import { UseCase } from "@core/UseCase";
import { Address } from "@entities/Address";
import { UsersRepository } from "@repositories/UsersRepository";
import { AppError } from "@shared/errors/AppError";

interface AddAddressToUserUseCaseRequest {
  userId: string;
  address: string;
}

class AddAddressToUserUseCase
  implements UseCase<AddAddressToUserUseCaseRequest, void> {
  constructor(private usersRepository: UsersRepository) {}

  async execute({
    userId,
    address,
  }: AddAddressToUserUseCaseRequest): Promise<void> {
    const user = await this.usersRepository.findById(userId);

    if (!user) {
      throw new AppError("User not found.");
    }

    user.addAddress(
      Address.create({
        value: address,
      })
    );

    await this.usersRepository.save(user);
  }
}

export { AddAddressToUserUseCase };
