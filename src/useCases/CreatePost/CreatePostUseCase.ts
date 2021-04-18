import { UseCase } from "@core/UseCase";
import { Post } from "@entities/Post";
import { PostsRepository } from "@repositories/PostsRepository";
import { UsersRepository } from "@repositories/UsersRepository";
import { AppError } from "@shared/errors/AppError";

interface CreatePostUseCaseRequest {
  userId: string;
  title: string;
  content: string;
}

interface CreatePostUseCaseResponse {
  post: Post;
}

class CreatePostUseCase
  implements UseCase<CreatePostUseCaseRequest, CreatePostUseCaseResponse> {
  constructor(
    private postsRepository: PostsRepository,
    private usersRepository: UsersRepository
  ) {}

  async execute({
    userId,
    title,
    content,
  }: CreatePostUseCaseRequest): Promise<CreatePostUseCaseResponse> {
    if (!userId) {
      throw new AppError("User id not provided.");
    }

    const user = await this.usersRepository.findById(userId);

    if (!user) {
      throw new AppError("User not found.");
    }

    const post = Post.create({
      userId,
      title,
      content,
    });

    await this.postsRepository.save(post);

    return {
      post,
    };
  }
}

export { CreatePostUseCase };
