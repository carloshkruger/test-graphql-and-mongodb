import { Collection } from "mongodb";

import { User } from "@entities/User";
import { UserMapper } from "@infra/mongodb/mappers/UserMapper";
import { mongoHelper } from "@infra/mongodb/utils/MongoHelper";
import { UsersRepository } from "@repositories/UsersRepository";

class MongoDbUsersRepository implements UsersRepository {
  private getUserCollection(): Collection {
    return mongoHelper.getCollection("users");
  }

  private async userExistsById(id: string): Promise<boolean> {
    const model = await this.getUserCollection().findOne({ id });

    return !!model;
  }

  async save(user: User): Promise<void> {
    const model = UserMapper.toRepository(user);

    const exists = await this.userExistsById(user.id);

    if (exists) {
      await this.getUserCollection().updateOne(
        { id: user.id },
        {
          $set: model,
        }
      );
    } else {
      await this.getUserCollection().insertOne(model);
    }
  }

  async findAll(): Promise<User[]> {
    const models = (await this.getUserCollection().find().toArray()) || [];

    return models.map((model) => UserMapper.toDomain(model));
  }

  async findById(id: string): Promise<User | undefined> {
    const model = await this.getUserCollection().findOne({ id });

    if (!model) {
      return undefined;
    }

    return UserMapper.toDomain(model);
  }

  async findByEmail(email: string): Promise<User | undefined> {
    const model = await this.getUserCollection().findOne({ email });

    if (!model) {
      return undefined;
    }

    return UserMapper.toDomain(model);
  }

  async delete(id: string): Promise<void> {
    await this.getUserCollection().deleteOne({ id });
  }
}

export { MongoDbUsersRepository };
