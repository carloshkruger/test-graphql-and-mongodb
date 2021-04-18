import { InMemoryUsersRepository } from "@infra/repositories/inMemory/InMemoryUsersRepository";
import { UsersRepository } from "@repositories/UsersRepository";
import { UserEntityMock } from "@tests/mocks/UserEntityMock";
import { AddAddressToUserUseCase } from "@useCases/AddAddressToUser/AddAddressToUserUseCase";

let inMemoryUsersRepository: UsersRepository;
let addAddressToUserUseCase: AddAddressToUserUseCase;

describe("AddAddressToUserUseCase", () => {
  beforeEach(() => {
    inMemoryUsersRepository = new InMemoryUsersRepository();
    addAddressToUserUseCase = new AddAddressToUserUseCase(
      inMemoryUsersRepository
    );
  });

  test("should throw if the user does not exists", async () => {
    await expect(
      addAddressToUserUseCase.execute({
        userId: "",
        address: "",
      })
    ).rejects.toThrow();
  });

  test("should add an address to an user", async () => {
    const user = UserEntityMock.create();

    jest
      .spyOn(inMemoryUsersRepository, "findById")
      .mockImplementation(async () => user);

    await expect(
      addAddressToUserUseCase.execute({
        userId: user.id,
        address: "rua tal tal tal, numero tal, bairro tal",
      })
    ).resolves.not.toThrow();
  });
});
