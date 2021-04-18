import { AuthTokenProvider, AuthTokenParams } from "./AuthTokenProvider";

class FakeAuthTokenProvider implements AuthTokenProvider {
  generate({ userId }: AuthTokenParams): string {
    return `${userId}abc123`;
  }

  verify(token: string): AuthTokenParams {
    return {
      userId: "",
    };
  }
}

export { FakeAuthTokenProvider };
