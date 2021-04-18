import { Address } from "@entities/Address";
import { Identifier } from "@entities/Identifier";

class AddressMapper {
  static toDomain(model: any): Address {
    return Address.create({ value: model.value }, new Identifier(model.id));
  }

  static toRepository(address: Address): any {
    return {
      id: address.id,
      value: address.value,
    };
  }
}

export { AddressMapper };
