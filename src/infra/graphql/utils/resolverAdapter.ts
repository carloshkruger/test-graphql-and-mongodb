import { Controller } from "@core/Controller";
import {
  ApolloError,
  AuthenticationError,
  ForbiddenError,
  UserInputError,
} from "apollo-server-errors";

export const resolverAdapter = async (
  controller: Controller,
  args: any,
  context: any
) => {
  const data =
    args !== null && !Array.isArray(args) && typeof args === "object"
      ? args
      : {};

  const controllerResponse = await controller.execute({
    data,
    loggedUserId: context?.user?.id,
  });

  switch (controllerResponse.statusCode) {
    case 200:
    case 201:
    case 204:
      return controllerResponse.data;
    case 400:
    case 404:
    case 409:
      throw new UserInputError(controllerResponse.error || "");
    case 401:
      throw new AuthenticationError(controllerResponse.error || "");
    case 403:
      throw new ForbiddenError(controllerResponse.error || "");
    default:
      throw new ApolloError(controllerResponse.error || "");
  }
};
