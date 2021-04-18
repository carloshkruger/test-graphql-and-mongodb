import { gql } from "apollo-server-core";

export default gql`
  extend type Mutation {
    signIn(email: String!, password: String!): SignInResponse!
  }

  type SignInResponse {
    accessToken: String!
    user: SignInUser!
  }

  type SignInUser {
    id: ID!
    name: String!
    email: String!
  }
`;
