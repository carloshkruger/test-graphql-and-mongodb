import {
  Controller,
  ControllerRequest,
  ControllerResponse,
} from "@core/Controller";
import { SignInUseCase } from "@useCases/SignIn/SignInUseCase";

class SignInController extends Controller {
  constructor(private useCase: SignInUseCase) {
    super();
  }

  async handle(request: ControllerRequest): Promise<ControllerResponse> {
    const { email, password } = request.data;

    const useCaseResponse = await this.useCase.execute({
      email,
      password,
    });

    const response = {
      accessToken: useCaseResponse.accessToken,
      user: {
        id: useCaseResponse.user.id,
        name: useCaseResponse.user.name,
        email: useCaseResponse.user.email,
      },
    };

    return this.ok(response);
  }
}

export { SignInController };
