import { Post } from "@entities/Post";

interface PostsRepository {
  save(post: Post): Promise<void>;
  findById(id: string): Promise<Post | undefined>;
  findByUserId(userId: string): Promise<Post[]>;
}

export { PostsRepository };
