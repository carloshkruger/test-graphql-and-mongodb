import { GraphQLScalarType } from "graphql";

export default {
  Void: new GraphQLScalarType({
    name: "Void",
    description: "Represents NULL values",
    serialize() {
      return null;
    },
    parseValue() {
      return null;
    },
    parseLiteral() {
      return null;
    },
  }),
};
