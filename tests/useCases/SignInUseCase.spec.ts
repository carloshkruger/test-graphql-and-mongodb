import { User } from "@entities/User";
import { InMemoryUsersRepository } from "@infra/repositories/inMemory/InMemoryUsersRepository";
import { UsersRepository } from "@repositories/UsersRepository";
import { AuthTokenProvider } from "@shared/providers/AuthTokenProvider/AuthTokenProvider";
import { FakeAuthTokenProvider } from "@shared/providers/AuthTokenProvider/FakeAuthTokenProvider";
import { UserEntityMock } from "@tests/mocks/UserEntityMock";
import { SignInUseCase } from "@useCases/SignIn/SignInUseCase";

let fakeAuthTokenProvider: AuthTokenProvider;
let inMemoryUsersRepository: UsersRepository;
let signInUseCase: SignInUseCase;

describe("SignInUseCase", () => {
  beforeEach(() => {
    fakeAuthTokenProvider = new FakeAuthTokenProvider();
    inMemoryUsersRepository = new InMemoryUsersRepository();
    signInUseCase = new SignInUseCase(
      inMemoryUsersRepository,
      fakeAuthTokenProvider
    );
  });

  test("should throw if the user was not found", async () => {
    await expect(
      signInUseCase.execute({
        email: "",
        password: "",
      })
    ).rejects.toThrow();
  });

  test("should throw if the password does not match", async () => {
    const user = UserEntityMock.create();

    jest
      .spyOn(inMemoryUsersRepository, "findByEmail")
      .mockImplementation(async () => user);

    await expect(
      signInUseCase.execute({
        email: user.email,
        password: `${user.password}diferent_password`,
      })
    ).rejects.toThrow();
  });

  test("should generate an access token", async () => {
    const user = UserEntityMock.create();

    jest
      .spyOn(inMemoryUsersRepository, "findByEmail")
      .mockImplementation(async () => user);

    const generateSpy = jest.spyOn(fakeAuthTokenProvider, "generate");

    const response = await signInUseCase.execute({
      email: user.email,
      password: user.password,
    });

    expect(response.accessToken).toBeTruthy();
    expect(response.user).toBeInstanceOf(User);
    expect(generateSpy).toHaveBeenCalledWith({ userId: user.id });
  });
});
