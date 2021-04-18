import { Express } from "express";
import { ApolloServer } from "apollo-server-express";

import typeDefs from "./typeDefs";
import resolvers from "./resolvers";
import { JWTAuthTokenProvider } from "@shared/providers/AuthTokenProvider/JWTAuthTokenProvider";
import { MongoDbUsersRepository } from "@infra/repositories/mongodb";

export default (app: Express) => {
  const apolloServer = new ApolloServer({
    typeDefs,
    resolvers,
    context: async ({ req }) => {
      try {
        const authorization = req.headers.authorization;

        if (!authorization) {
          return;
        }

        const [, token] = authorization.split(" ");

        if (!token) {
          return;
        }

        const authTokenProvider = new JWTAuthTokenProvider();
        const { userId } = authTokenProvider.verify(token);

        const usersRepository = new MongoDbUsersRepository();
        const user = await usersRepository.findById(userId);

        if (!user) {
          return;
        }

        return {
          user: {
            id: user.id,
            roles: user.roles,
          },
        };
      } catch {
        return;
      }
    },
  });

  apolloServer.applyMiddleware({ app });
};
