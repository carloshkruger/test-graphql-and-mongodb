interface AuthTokenParams {
  userId: string;
}

interface AuthTokenProvider {
  generate(params: AuthTokenParams): string;
  verify(token: string): AuthTokenParams;
}

export { AuthTokenProvider, AuthTokenParams };
