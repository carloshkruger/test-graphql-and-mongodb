import { Collection } from "mongodb";

import { Post } from "@entities/Post";
import { mongoHelper } from "@infra/mongodb/utils/MongoHelper";
import { PostsRepository } from "@repositories/PostsRepository";
import { PostMapper } from "@infra/mongodb/mappers/PostMapper";

class MongoDbPostsRepository implements PostsRepository {
  private getPostCollection(): Collection {
    return mongoHelper.getCollection("posts");
  }

  private async postExistsById(id: string): Promise<boolean> {
    const model = await this.getPostCollection().findOne({ id });

    return !!model;
  }

  async save(post: Post): Promise<void> {
    const model = PostMapper.toRepository(post);

    const exists = await this.postExistsById(post.id);

    if (exists) {
      await this.getPostCollection().updateOne(
        { id: post.id },
        {
          $set: model,
        }
      );
    } else {
      await this.getPostCollection().insertOne(model);
    }
  }

  async findById(id: string): Promise<Post | undefined> {
    const model = await this.getPostCollection().findOne(
      { id },
      {
        projection: {},
      }
    );

    if (!model) {
      return undefined;
    }

    return PostMapper.toDomain(model);
  }

  async findByUserId(userId: string): Promise<Post[]> {
    const models = await this.getPostCollection()
      .find({
        userId,
      })
      .toArray();

    return models.map((model) => PostMapper.toDomain(model));
  }
}

export { MongoDbPostsRepository };
