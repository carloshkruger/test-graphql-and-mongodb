import { gql } from "apollo-server-core";

export default gql`
  extend type Query {
    listUserPosts(userId: ID!): [Post!]!
    post(postId: ID!): Post!
  }

  type Post {
    id: ID!
    title: String!
    content: String!
    user: User!
  }

  extend type Mutation {
    createPost(title: String!, content: String!): CreatePostResponse!
  }

  type CreatePostResponse {
    id: ID!
  }
`;
