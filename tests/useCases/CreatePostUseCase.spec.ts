import { Identifier } from "@entities/Identifier";
import { Post } from "@entities/Post";
import { InMemoryPostsRepository } from "@infra/repositories/inMemory/InMemoryPostsRepository";
import { InMemoryUsersRepository } from "@infra/repositories/inMemory/InMemoryUsersRepository";
import { PostsRepository } from "@repositories/PostsRepository";
import { UsersRepository } from "@repositories/UsersRepository";
import { UserEntityMock } from "@tests/mocks/UserEntityMock";
import { CreatePostUseCase } from "@useCases/CreatePost/CreatePostUseCase";

let inMemoryUsersRepository: UsersRepository;
let inMemoryPostsRepository: PostsRepository;
let createPostUseCase: CreatePostUseCase;

describe("CreatePostUseCase", () => {
  beforeEach(() => {
    inMemoryPostsRepository = new InMemoryPostsRepository();
    inMemoryUsersRepository = new InMemoryUsersRepository();
    createPostUseCase = new CreatePostUseCase(
      inMemoryPostsRepository,
      inMemoryUsersRepository
    );
  });

  test("should throw if user id is not provided", async () => {
    await expect(
      createPostUseCase.execute({
        userId: "",
        content: "",
        title: "",
      })
    ).rejects.toThrow();
  });

  test("should throw if user was not found", async () => {
    await expect(
      createPostUseCase.execute({
        userId: new Identifier().id,
        content: "",
        title: "",
      })
    ).rejects.toThrow();
  });

  test("should create a post", async () => {
    const user = UserEntityMock.create();

    jest
      .spyOn(inMemoryUsersRepository, "findById")
      .mockImplementation(async () => user);

    const savePostSpy = jest.spyOn(inMemoryPostsRepository, "save");

    const response = await createPostUseCase.execute({
      userId: user.id,
      content: "test content",
      title: "test title",
    });

    expect(response.post).toBeInstanceOf(Post);
    expect(savePostSpy).toHaveBeenCalled();
  });
});
