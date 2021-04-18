# test-graphql-and-mongodb

Projeto para testar o GraphQL e o MongoDB.

Queries:
  - listUsers: [User!]!
  - listUserPosts(...): [Post!]!
  - post(...): Post!
  
Mutations:
  - createUser(...): CreateUserResponse
  - deleteUser(...): Void
  - addAddressToUser(...): Void
  - deleteUserAddress(...): Void
  - createPost(...): CreatePostResponse!
  - signIn(...): SignInResponse!
