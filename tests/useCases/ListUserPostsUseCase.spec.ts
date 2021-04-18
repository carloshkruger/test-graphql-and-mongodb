import { Post } from "@entities/Post";
import { InMemoryPostsRepository } from "@infra/repositories/inMemory/InMemoryPostsRepository";
import { PostsRepository } from "@repositories/PostsRepository";
import { UserEntityMock } from "@tests/mocks/UserEntityMock";
import { ListUserPostsUseCase } from "@useCases/ListUserPosts/ListUserPostsUseCase";

let inMemoryPostsRepository: PostsRepository;
let listUserPostsUseCase: ListUserPostsUseCase;

describe("ListUserPostsUseCase", () => {
  beforeEach(() => {
    inMemoryPostsRepository = new InMemoryPostsRepository();
    listUserPostsUseCase = new ListUserPostsUseCase(inMemoryPostsRepository);
  });

  test("should throw if user id is not provided", async () => {
    await expect(
      listUserPostsUseCase.execute({ userId: "" })
    ).rejects.toThrow();
  });

  test("should return a list of posts", async () => {
    const user = UserEntityMock.create();
    const post = Post.create({
      userId: user.id,
      title: "title test",
      content: "title content",
    });

    jest
      .spyOn(inMemoryPostsRepository, "findByUserId")
      .mockImplementation(async () => [post]);

    const response = await listUserPostsUseCase.execute({
      userId: user.id,
    });

    expect(response.posts[0]).toBeInstanceOf(Post);
  });
});
