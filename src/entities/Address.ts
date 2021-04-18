import { AppError } from "@shared/errors/AppError";
import { Entity } from "./Entity";
import { Identifier } from "./Identifier";

interface AddressProps {
  value: string;
}

class Address extends Entity {
  private _value: string;

  get value(): string {
    return this._value;
  }

  private constructor({ value }: AddressProps, id?: Identifier) {
    super(id);

    this._value = value;
  }

  public static create(props: AddressProps, id?: Identifier): Address {
    Address.validate(props);

    return new Address(props, id);
  }

  private static validate(props: AddressProps): void {
    if (!props.value) {
      throw new AppError("Invalid Address.");
    }
  }
}

export { Address };
