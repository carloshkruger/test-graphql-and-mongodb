import { UseCase } from "@core/UseCase";
import { Post } from "@entities/Post";
import { User } from "@entities/User";
import { PostsRepository } from "@repositories/PostsRepository";
import { UsersRepository } from "@repositories/UsersRepository";
import { AppError } from "@shared/errors/AppError";

interface FindPostByIdUseCaseRequest {
  postId: string;
}

interface FindPostByIdUseCaseResponse {
  post: Post;
  user: User;
}

class FindPostByIdUseCase
  implements UseCase<FindPostByIdUseCaseRequest, FindPostByIdUseCaseResponse> {
  constructor(
    private postsRepository: PostsRepository,
    private usersRepository: UsersRepository
  ) {}

  async execute({
    postId,
  }: FindPostByIdUseCaseRequest): Promise<FindPostByIdUseCaseResponse> {
    if (!postId) {
      throw new AppError("Post id not provided.");
    }

    const post = await this.postsRepository.findById(postId);

    if (!post) {
      throw new AppError("Post not found.");
    }

    const user = await this.usersRepository.findById(post.userId);

    if (!user) {
      throw new AppError("User not found");
    }

    return {
      post,
      user,
    };
  }
}

export { FindPostByIdUseCase };
