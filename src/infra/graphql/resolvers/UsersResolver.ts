import { CreateUserController } from "@controllers/CreateUserController";
import { DeleteUserController } from "@controllers/DeleteUserController";
import { ListUsersController } from "@controllers/ListUsersController";
import { CreateUserUseCase } from "@useCases/CreateUser/CreateUserUseCase";
import { DeleteUserUseCase } from "@useCases/DeleteUser/DeleteUserUseCase";
import { ListUsersUseCase } from "@useCases/ListUsers/ListUsersUseCase";
import { MongoDbUsersRepository } from "@infra/repositories/mongodb";
import { resolverAdapter } from "@infra/graphql/utils/resolverAdapter";
import { authorization } from "../utils/authorization";
import { AddAddressToUserUseCase } from "@useCases/AddAddressToUser/AddAddressToUserUseCase";
import { AddAddressToUserController } from "@controllers/AddAddressToUserController";
import { DeleteUserAddressController } from "@controllers/DeleteUserAddressController";
import { DeleteUserAddressUseCase } from "@useCases/DeleteUserAddress/DeleteUserAddressUseCase";
import { ListUserPostsUseCase } from "@useCases/ListUserPosts/ListUserPostsUseCase";
import { ListUserPostsController } from "@controllers/ListUserPostsController";
import { MongoDbPostsRepository } from "@infra/repositories/mongodb/MongoDbPostsRepository";

const usersRepository = new MongoDbUsersRepository();
const postsRepository = new MongoDbPostsRepository();

const listUsersUseCase = new ListUsersUseCase(usersRepository);
const listUsersController = new ListUsersController(listUsersUseCase);

const createUserUseCase = new CreateUserUseCase(usersRepository);
const createUserController = new CreateUserController(createUserUseCase);

const deleteUserUseCase = new DeleteUserUseCase(usersRepository);
const deleteUserController = new DeleteUserController(deleteUserUseCase);

const addAddressToUserUseCase = new AddAddressToUserUseCase(usersRepository);
const addAddressToUserController = new AddAddressToUserController(
  addAddressToUserUseCase
);

const deleteUserAddressUseCase = new DeleteUserAddressUseCase(usersRepository);
const deleteUserAddressController = new DeleteUserAddressController(
  deleteUserAddressUseCase
);

const listUserPostsUseCase = new ListUserPostsUseCase(postsRepository);
const listUserPostsController = new ListUserPostsController(
  listUserPostsUseCase
);

export default {
  Query: {
    listUsers: async (parent: any, args: any, context: any) => {
      // authorization(context, [UserRole.ADMIN]);
      return resolverAdapter(listUsersController, args, context);
    },
  },
  Mutation: {
    createUser: async (parent: any, args: any, context: any) =>
      resolverAdapter(createUserController, args, context),

    deleteUser: async (parent: any, args: any, context: any) =>
      resolverAdapter(deleteUserController, args, context),

    addAddressToUser: async (parent: any, args: any, context: any) => {
      authorization(context);
      return resolverAdapter(addAddressToUserController, args, context);
    },

    deleteUserAddress: async (parent: any, args: any, context: any) => {
      authorization(context);
      return resolverAdapter(deleteUserAddressController, args, context);
    },
  },
  User: {
    posts: async (parent: any, args: any, context: any, a: any) => {
      const params = {
        ...args,
        userId: parent.id,
      };

      return resolverAdapter(listUserPostsController, params, context);
    },
  },
};
