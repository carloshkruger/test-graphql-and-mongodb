import { Identifier } from "@entities/Identifier";
import { Post } from "@entities/Post";
import { User } from "@entities/User";

class PostEntityMock {
  static create(): Post {
    return Post.create({
      title: "title test",
      content: "content test",
      userId: new Identifier().id,
    });
  }

  static createFromUser(user: User): Post {
    return Post.create({
      title: "title test",
      content: "content test",
      userId: user.id,
    });
  }
}

export { PostEntityMock };
