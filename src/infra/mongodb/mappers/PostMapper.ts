import { Identifier } from "@entities/Identifier";
import { Post } from "@entities/Post";

class PostMapper {
  static toDomain(model: any): Post {
    return Post.create(
      {
        userId: model.userId,
        title: model.title,
        content: model.content,
      },
      new Identifier(model.id)
    );
  }

  static toRepository(post: Post): any {
    return {
      id: post.id,
      userId: post.userId,
      title: post.title,
      content: post.content,
    };
  }
}

export { PostMapper };
