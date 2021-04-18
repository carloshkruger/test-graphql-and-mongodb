import {
  Controller,
  ControllerRequest,
  ControllerResponse,
} from "@core/Controller";
import { AddAddressToUserUseCase } from "@useCases/AddAddressToUser/AddAddressToUserUseCase";

class AddAddressToUserController extends Controller {
  constructor(private useCase: AddAddressToUserUseCase) {
    super();
  }

  async handle(request: ControllerRequest): Promise<ControllerResponse> {
    const { address } = request.data;
    const userId = request.loggedUserId || "";

    await this.useCase.execute({
      userId,
      address,
    });

    return this.noContent();
  }
}

export { AddAddressToUserController };
