import {
  Controller,
  ControllerRequest,
  ControllerResponse,
} from "@core/Controller";
import { ListUsersUseCase } from "@useCases/ListUsers/ListUsersUseCase";

class ListUsersController extends Controller {
  constructor(private useCase: ListUsersUseCase) {
    super();
  }

  async handle(request: ControllerRequest): Promise<ControllerResponse> {
    const useCaseResponse = await this.useCase.execute();

    const response = useCaseResponse.map((user) => ({
      id: user.id,
      name: user.name,
      email: user.email,
      address: user.address.map((item) => ({
        id: item.id,
        value: item.value,
      })),
    }));

    return this.ok(response);
  }
}

export { ListUsersController };
