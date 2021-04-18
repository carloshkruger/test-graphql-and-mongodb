import { AppError } from "@shared/errors/AppError";
import { Entity } from "./Entity";
import { Identifier } from "./Identifier";

interface PostProps {
  userId: string;
  title: string;
  content: string;
}

class Post extends Entity {
  private _userId: string;
  private _title: string;
  private _content: string;

  get userId(): string {
    return this._userId;
  }

  get title(): string {
    return this._title;
  }

  get content(): string {
    return this._content;
  }

  private constructor({ userId, title, content }: PostProps, id?: Identifier) {
    super(id);

    this._userId = userId;
    this._title = title;
    this._content = content;
  }

  public static create(props: PostProps, id?: Identifier): Post {
    Post.validate(props);

    return new Post(props, id);
  }

  private static validate(props: PostProps): void {
    if (!props.userId) {
      throw new AppError("User id is required.");
    }

    if (!props.title) {
      throw new AppError("Title is required.");
    }

    if (!props.content) {
      throw new AppError("Content is required.");
    }
  }
}

export { Post };
