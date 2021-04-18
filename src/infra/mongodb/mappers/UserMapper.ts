import { Address } from "@entities/Address";
import { Identifier } from "@entities/Identifier";
import { User } from "@entities/User";
import { AddressMapper } from "./AddressMapper";

class UserMapper {
  static toDomain(model: any): User {
    return User.create(
      {
        name: model.name,
        email: model.email,
        password: model.password,
        roles: model.roles,
        address: model.address?.map((item: any) =>
          AddressMapper.toDomain(item)
        ),
      },
      new Identifier(model.id)
    );
  }

  static toRepository(user: User): any {
    return {
      id: user.id,
      name: user.name,
      email: user.email,
      password: user.password,
      roles: user.roles,
      address: user.address.map((item) => AddressMapper.toRepository(item)),
    };
  }
}

export { UserMapper };
