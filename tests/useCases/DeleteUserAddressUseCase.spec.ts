import { User } from "@entities/User";
import { InMemoryUsersRepository } from "@infra/repositories/inMemory/InMemoryUsersRepository";
import { UsersRepository } from "@repositories/UsersRepository";
import { UserEntityMock } from "@tests/mocks/UserEntityMock";
import { DeleteUserAddressUseCase } from "@useCases/DeleteUserAddress/DeleteUserAddressUseCase";

let inMemoryUsersRepository: UsersRepository;
let deleteUserAddressUseCase: DeleteUserAddressUseCase;

describe("DeleteUserAddressUseCase", () => {
  beforeEach(() => {
    inMemoryUsersRepository = new InMemoryUsersRepository();
    deleteUserAddressUseCase = new DeleteUserAddressUseCase(
      inMemoryUsersRepository
    );
  });

  test("should throw if the user was not found", async () => {
    const saveSpy = jest.spyOn(inMemoryUsersRepository, "save");

    await expect(
      deleteUserAddressUseCase.execute({
        userId: "",
        addressId: "",
      })
    ).rejects.toThrow();
    expect(saveSpy).not.toHaveBeenCalled();
  });

  test("should delete an user address", async () => {
    const user = UserEntityMock.create();

    jest
      .spyOn(inMemoryUsersRepository, "findById")
      .mockImplementation(async () => user);

    const removeAddressSpy = jest.spyOn(User.prototype, "removeAddressById");
    const saveSpy = jest.spyOn(inMemoryUsersRepository, "save");

    const addressId = user.address[0].id;

    await expect(
      deleteUserAddressUseCase.execute({
        userId: user.id,
        addressId,
      })
    ).resolves.not.toThrow();

    expect(removeAddressSpy).toHaveBeenCalledWith(addressId);
    expect(saveSpy).toHaveBeenCalled();
  });
});
