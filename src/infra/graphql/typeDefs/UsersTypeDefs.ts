import { gql } from "apollo-server-core";

export default gql`
  extend type Query {
    listUsers: [User!]!
  }

  extend type Mutation {
    createUser(
      name: String!
      email: String!
      password: String!
    ): CreateUserResponse

    deleteUser(userId: ID!): Void

    addAddressToUser(address: String!): Void

    deleteUserAddress(addressId: ID!): Void
  }

  type CreateUserResponse {
    id: ID!
  }

  type User {
    id: ID!
    name: String!
    email: String!
    roles: [String!]!
    address: [Address!]!
    posts: [Post!]!
  }

  type Address {
    id: ID!
    value: String!
  }
`;
