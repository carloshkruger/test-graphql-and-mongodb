import { User } from "src/entities/User";

interface UsersRepository {
  save(user: User): Promise<void>;
  findAll(): Promise<User[]>;
  findById(id: string): Promise<User | undefined>;
  findByEmail(email: string): Promise<User | undefined>;
  delete(id: string): Promise<void>;
}

export { UsersRepository };
