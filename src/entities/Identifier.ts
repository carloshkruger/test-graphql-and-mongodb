import { v4 } from "uuid";

class Identifier {
  private _id: string;

  get id(): string {
    return this._id;
  }

  constructor(id?: string) {
    this._id = id || v4();
  }
}

export { Identifier };
