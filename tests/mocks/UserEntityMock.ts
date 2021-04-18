import { Address } from "@entities/Address";
import { User } from "@entities/User";

class UserEntityMock {
  static create(): User {
    return User.create({
      name: "valid user name",
      email: "valid_email@domain.com",
      password: "valid_password",
      address: [Address.create({ value: "rua tal" })],
    });
  }
}

export { UserEntityMock };
