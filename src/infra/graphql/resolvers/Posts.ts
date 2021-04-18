import { CreatePostController } from "@controllers/CreatePostController";
import { FindPostByIdController } from "@controllers/FindPostByIdController";
import { ListUserPostsController } from "@controllers/ListUserPostsController";
import { MongoDbUsersRepository } from "@infra/repositories/mongodb";
import { MongoDbPostsRepository } from "@infra/repositories/mongodb/MongoDbPostsRepository";
import { CreatePostUseCase } from "@useCases/CreatePost/CreatePostUseCase";
import { FindPostByIdUseCase } from "@useCases/FindPostById/FindPostByIdUseCase";
import { ListUserPostsUseCase } from "@useCases/ListUserPosts/ListUserPostsUseCase";
import { authorization } from "../utils/authorization";
import { resolverAdapter } from "../utils/resolverAdapter";

const usersRepository = new MongoDbUsersRepository();
const postsRepository = new MongoDbPostsRepository();

const createPostUseCase = new CreatePostUseCase(
  postsRepository,
  usersRepository
);
const createPostController = new CreatePostController(createPostUseCase);

const listUserPostsUseCase = new ListUserPostsUseCase(postsRepository);
const listUserPostsController = new ListUserPostsController(
  listUserPostsUseCase
);

const findPostByIdUseCase = new FindPostByIdUseCase(
  postsRepository,
  usersRepository
);
const findPostByIdController = new FindPostByIdController(findPostByIdUseCase);

export default {
  Query: {
    listUserPosts: (parent: any, args: any, context: any) => {
      authorization(context);
      return resolverAdapter(listUserPostsController, args, context);
    },
    post: (parent: any, args: any, context: any) => {
      return resolverAdapter(findPostByIdController, args, context);
    },
  },

  Mutation: {
    createPost: (parent: any, args: any, context: any) => {
      authorization(context);
      return resolverAdapter(createPostController, args, context);
    },
  },
};
