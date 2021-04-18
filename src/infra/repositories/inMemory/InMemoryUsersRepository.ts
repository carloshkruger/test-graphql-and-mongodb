import { UsersRepository } from "@repositories/UsersRepository";
import { User } from "src/entities/User";

class InMemoryUsersRepository implements UsersRepository {
  async save(user: User): Promise<void> {}

  async findAll(): Promise<User[]> {
    return [];
  }

  async findByEmail(email: string): Promise<User | undefined> {
    return undefined;
  }

  async findById(id: string): Promise<User | undefined> {
    return undefined;
  }

  async delete(id: string): Promise<void> {}
}

export { InMemoryUsersRepository };
