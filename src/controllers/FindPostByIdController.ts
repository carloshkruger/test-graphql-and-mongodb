import {
  Controller,
  ControllerRequest,
  ControllerResponse,
} from "@core/Controller";
import { FindPostByIdUseCase } from "@useCases/FindPostById/FindPostByIdUseCase";

class FindPostByIdController extends Controller {
  constructor(private useCase: FindPostByIdUseCase) {
    super();
  }

  async handle(request: ControllerRequest): Promise<ControllerResponse> {
    const { postId } = request.data;

    const { post, user } = await this.useCase.execute({ postId });

    return this.ok({
      id: post.id,
      title: post.title,
      content: post.content,
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
      },
    });
  }
}

export { FindPostByIdController };
