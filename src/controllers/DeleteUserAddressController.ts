import {
  Controller,
  ControllerRequest,
  ControllerResponse,
} from "@core/Controller";
import { DeleteUserAddressUseCase } from "@useCases/DeleteUserAddress/DeleteUserAddressUseCase";

class DeleteUserAddressController extends Controller {
  constructor(private useCase: DeleteUserAddressUseCase) {
    super();
  }

  async handle(request: ControllerRequest): Promise<ControllerResponse> {
    const { addressId } = request.data;
    const userId = request.loggedUserId || "";

    await this.useCase.execute({
      userId,
      addressId,
    });

    return this.noContent();
  }
}

export { DeleteUserAddressController };
