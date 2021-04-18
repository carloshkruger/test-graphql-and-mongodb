interface UseCase<Request, Response> {
  execute(props: Request): Promise<Response>;
}

export { UseCase };
