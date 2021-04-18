import { InMemoryUsersRepository } from "@infra/repositories/inMemory/InMemoryUsersRepository";
import { UsersRepository } from "@repositories/UsersRepository";
import { AppError } from "@shared/errors/AppError";
import { UserEntityMock } from "@tests/mocks/UserEntityMock";
import { CreateUserUseCase } from "@useCases/CreateUser/CreateUserUseCase";

let inMemoryUsersRepository: UsersRepository;
let createUserUseCase: CreateUserUseCase;

describe("CreateUserUseCase", () => {
  beforeEach(() => {
    inMemoryUsersRepository = new InMemoryUsersRepository();
    createUserUseCase = new CreateUserUseCase(inMemoryUsersRepository);
  });

  test("should not be possible to create an user with an e-mail already registered", async () => {
    jest
      .spyOn(inMemoryUsersRepository, "findByEmail")
      .mockImplementation(async () => UserEntityMock.create());

    await expect(
      createUserUseCase.execute({
        name: "valid_name",
        email: "valid_email@domain.com",
        password: "valid_password",
      })
    ).rejects.toThrow(AppError);
  });

  test("should create an user with correct values", async () => {
    await expect(
      createUserUseCase.execute({
        name: "valid_name",
        email: "valid_email@domain.com",
        password: "valid_password",
      })
    ).resolves.not.toThrow();
  });
});
