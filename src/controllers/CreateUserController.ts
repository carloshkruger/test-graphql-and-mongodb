import {
  Controller,
  ControllerRequest,
  ControllerResponse,
} from "@core/Controller";
import { CreateUserUseCase } from "@useCases/CreateUser/CreateUserUseCase";

class CreateUserController extends Controller {
  constructor(private useCase: CreateUserUseCase) {
    super();
  }

  async handle(request: ControllerRequest): Promise<ControllerResponse> {
    const { name, email, password } = request.data;

    const useCaseResponse = await this.useCase.execute({
      name,
      email,
      password,
    });

    return this.created({
      id: useCaseResponse.id,
    });
  }
}

export { CreateUserController };
