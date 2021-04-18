import {
  Controller,
  ControllerRequest,
  ControllerResponse,
} from "@core/Controller";
import { CreatePostUseCase } from "@useCases/CreatePost/CreatePostUseCase";

class CreatePostController extends Controller {
  constructor(private useCase: CreatePostUseCase) {
    super();
  }

  async handle(request: ControllerRequest): Promise<ControllerResponse> {
    const { title, content } = request.data;
    const userId = request.loggedUserId || "";

    const { post } = await this.useCase.execute({
      userId,
      title,
      content,
    });

    return this.created({
      id: post.id,
    });
  }
}

export { CreatePostController };
