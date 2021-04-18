import express from "express";
import setupApolloServer from "@infra/graphql/server";

const app = express();

setupApolloServer(app);

export { app };
