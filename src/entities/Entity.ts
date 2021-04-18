import { v4 } from "uuid";
import { Identifier } from "./Identifier";

class Entity {
  private identifier: Identifier;

  get id(): string {
    return this.identifier.id;
  }

  constructor(id?: Identifier) {
    this.identifier = id || new Identifier();
  }
}

export { Entity };
