import { InMemoryPostsRepository } from "@infra/repositories/inMemory/InMemoryPostsRepository";
import { InMemoryUsersRepository } from "@infra/repositories/inMemory/InMemoryUsersRepository";
import { PostsRepository } from "@repositories/PostsRepository";
import { UsersRepository } from "@repositories/UsersRepository";
import { PostEntityMock } from "@tests/mocks/PostEntityMock";
import { UserEntityMock } from "@tests/mocks/UserEntityMock";
import { FindPostByIdUseCase } from "@useCases/FindPostById/FindPostByIdUseCase";

let inMemoryUsersRepository: UsersRepository;
let inMemoryPostsRepository: PostsRepository;
let findPostByIdUseCase: FindPostByIdUseCase;

describe("FindPostByIdUseCase", () => {
  beforeEach(() => {
    inMemoryPostsRepository = new InMemoryPostsRepository();
    inMemoryUsersRepository = new InMemoryUsersRepository();
    findPostByIdUseCase = new FindPostByIdUseCase(
      inMemoryPostsRepository,
      inMemoryUsersRepository
    );
  });

  test("should throw if post id is not provided", async () => {
    await expect(findPostByIdUseCase.execute({ postId: "" })).rejects.toThrow();
  });

  test("should return a post", async () => {
    const user = UserEntityMock.create();
    const post = PostEntityMock.createFromUser(user);

    jest
      .spyOn(inMemoryPostsRepository, "findById")
      .mockImplementation(async () => post);

    jest
      .spyOn(inMemoryUsersRepository, "findById")
      .mockImplementation(async () => user);

    const response = await findPostByIdUseCase.execute({ postId: post.id });

    expect(response.post).toBeTruthy();
    expect(response.user).toBeTruthy();
  });
});
