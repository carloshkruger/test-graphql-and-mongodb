import {
  Controller,
  ControllerRequest,
  ControllerResponse,
} from "@core/Controller";
import { DeleteUserUseCase } from "@useCases/DeleteUser/DeleteUserUseCase";

class DeleteUserController extends Controller {
  constructor(private useCase: DeleteUserUseCase) {
    super();
  }

  async handle(request: ControllerRequest): Promise<ControllerResponse> {
    const { userId } = request.data;

    await this.useCase.execute({ userId });

    return this.noContent();
  }
}

export { DeleteUserController };
