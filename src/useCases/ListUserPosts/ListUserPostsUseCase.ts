import { UseCase } from "@core/UseCase";
import { Post } from "@entities/Post";
import { PostsRepository } from "@repositories/PostsRepository";
import { AppError } from "@shared/errors/AppError";

interface ListUserPostsUseCaseRequest {
  userId: string;
}

interface ListUserPostsUseCaseResponse {
  posts: Post[];
}

class ListUserPostsUseCase
  implements
    UseCase<ListUserPostsUseCaseRequest, ListUserPostsUseCaseResponse> {
  constructor(private postsRepository: PostsRepository) {}

  async execute({
    userId,
  }: ListUserPostsUseCaseRequest): Promise<ListUserPostsUseCaseResponse> {
    if (!userId) {
      throw new AppError("User id not provided.");
    }

    const posts = await this.postsRepository.findByUserId(userId);

    return {
      posts,
    };
  }
}

export { ListUserPostsUseCase };
