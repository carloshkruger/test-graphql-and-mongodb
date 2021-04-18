import { AuthTokenProvider, AuthTokenParams } from "./AuthTokenProvider";
import { sign, verify } from "jsonwebtoken";

class JWTAuthTokenProvider implements AuthTokenProvider {
  generate({ userId }: AuthTokenParams): string {
    return sign({ userId }, "secret");
  }

  verify(token: string): AuthTokenParams {
    return verify(token, "secret") as AuthTokenParams;
  }
}

export { JWTAuthTokenProvider };
