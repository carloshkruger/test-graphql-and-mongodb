import { Post } from "@entities/Post";
import { PostsRepository } from "@repositories/PostsRepository";

class InMemoryPostsRepository implements PostsRepository {
  async save(post: Post): Promise<void> {}

  async findById(userId: string): Promise<Post | undefined> {
    return undefined;
  }

  async findByUserId(userId: string): Promise<Post[]> {
    return [];
  }
}

export { InMemoryPostsRepository };
