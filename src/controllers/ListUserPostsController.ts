import {
  Controller,
  ControllerRequest,
  ControllerResponse,
} from "@core/Controller";
import { ListUserPostsUseCase } from "@useCases/ListUserPosts/ListUserPostsUseCase";

class ListUserPostsController extends Controller {
  constructor(private useCase: ListUserPostsUseCase) {
    super();
  }

  async handle(request: ControllerRequest): Promise<ControllerResponse> {
    const { userId } = request.data;

    const { posts } = await this.useCase.execute({
      userId,
    });

    const mappedPosts = posts.map((post) => ({
      id: post.id,
      title: post.title,
      content: post.content,
    }));

    return this.ok(mappedPosts);
  }
}

export { ListUserPostsController };
