import { AppError } from "@shared/errors/AppError";
import { User } from "../../src/entities/User";

describe("User", () => {
  test("should not be possible to create an user without name", () => {
    expect(() =>
      User.create({
        name: "",
        email: "valid_email@domain.com",
        password: "valid_password",
      })
    ).toThrow(AppError);
  });

  test("should not be possible to create an user without email", () => {
    expect(() =>
      User.create({
        name: "valid user name",
        email: "",
        password: "valid_password",
      })
    ).toThrow(AppError);
  });

  test("should not be possible to create an user without password", () => {
    expect(() =>
      User.create({
        name: "valid user name",
        email: "valid_email@domain.com",
        password: "",
      })
    ).toThrow(AppError);
  });

  test("should create an user with valid values", () => {
    const user = User.create({
      name: "valid user name",
      email: "valid_email@domain.com",
      password: "valid_password",
    });

    expect(user).toBeInstanceOf(User);
    expect(user.name).toBe("valid user name");
    expect(user.email).toBe("valid_email@domain.com");
    expect(user.password).toBe("valid_password");
  });
});
