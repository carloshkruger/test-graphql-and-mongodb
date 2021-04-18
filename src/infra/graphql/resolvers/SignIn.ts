import { SignInController } from "@controllers/SignInController";
import { MongoDbUsersRepository } from "@infra/repositories/mongodb";
import { JWTAuthTokenProvider } from "@shared/providers/AuthTokenProvider/JWTAuthTokenProvider";
import { SignInUseCase } from "@useCases/SignIn/SignInUseCase";
import { resolverAdapter } from "../utils/resolverAdapter";

const usersRepository = new MongoDbUsersRepository();
const authTokenProvider = new JWTAuthTokenProvider();
const signInUseCase = new SignInUseCase(usersRepository, authTokenProvider);
const signInController = new SignInController(signInUseCase);

export default {
  Mutation: {
    signIn: (parent: any, args: any, context: any) =>
      resolverAdapter(signInController, args, context),
  },
};
