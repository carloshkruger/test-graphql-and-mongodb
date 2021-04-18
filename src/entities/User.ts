import { AppError } from "@shared/errors/AppError";
import { Address } from "./Address";
import { Entity } from "./Entity";
import { Identifier } from "./Identifier";
import { UserRole } from "./UserRole";

interface UserProps {
  name: string;
  email: string;
  password: string;
  roles?: UserRole[];
  address?: Address[];
}

class User extends Entity {
  private _name: string;
  private _email: string;
  private _password: string;
  private _roles: UserRole[];
  private _address: Address[];

  get name(): string {
    return this._name;
  }

  get email(): string {
    return this._email;
  }

  get password(): string {
    return this._password;
  }

  get roles(): UserRole[] {
    return this._roles;
  }

  get address(): Address[] {
    return this._address;
  }

  private constructor(
    { name, email, password, roles, address }: UserProps,
    id?: Identifier
  ) {
    super(id);

    this._name = name;
    this._email = email;
    this._password = password;
    this._roles = roles || [UserRole.DEFAULT];
    this._address = address || [];
  }

  public static create(props: UserProps, id?: Identifier): User {
    User.validate(props);

    return new User(props, id);
  }

  private static validate(props: UserProps) {
    if (!props.name) {
      throw new AppError("User name is required.");
    }

    if (!props.email) {
      throw new AppError("User e-mail is required.");
    }

    if (!props.password) {
      throw new AppError("User password is required.");
    }
  }

  public addAddress(address: Address): void {
    this._address.push(address);
  }

  public removeAddressById(addressId: string): void {
    const findIndex = this._address.findIndex(
      (address) => address.id === addressId
    );

    if (!(findIndex >= 0)) {
      throw new AppError("Address not found.");
    }

    this._address.splice(findIndex, 1);
  }
}

export { User };
