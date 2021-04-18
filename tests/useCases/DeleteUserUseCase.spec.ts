import { Identifier } from "@entities/Identifier";
import { InMemoryUsersRepository } from "@infra/repositories/inMemory/InMemoryUsersRepository";
import { UsersRepository } from "@repositories/UsersRepository";
import { DeleteUserUseCase } from "@useCases/DeleteUser/DeleteUserUseCase";
import { UserEntityMock } from "@tests/mocks/UserEntityMock";

let inMemoryUsersRepository: UsersRepository;
let deleteUserUseCase: DeleteUserUseCase;

describe("DeleteUserUseCase", () => {
  beforeEach(() => {
    inMemoryUsersRepository = new InMemoryUsersRepository();
    deleteUserUseCase = new DeleteUserUseCase(inMemoryUsersRepository);
  });

  test("should not be possible to delete an user that does not exists", async () => {
    const deleteSpy = jest.spyOn(inMemoryUsersRepository, "delete");

    await expect(
      deleteUserUseCase.execute({
        userId: new Identifier().id,
      })
    ).rejects.toThrow();

    expect(deleteSpy).not.toHaveBeenCalled();
  });

  test("should delete an user if exists", async () => {
    const user = UserEntityMock.create();

    jest
      .spyOn(inMemoryUsersRepository, "findById")
      .mockImplementation(async () => user);

    const deleteSpy = jest.spyOn(inMemoryUsersRepository, "delete");

    await expect(
      deleteUserUseCase.execute({
        userId: user.id,
      })
    ).resolves.not.toThrow();

    expect(deleteSpy).toHaveBeenCalledWith(user.id);
  });
});
