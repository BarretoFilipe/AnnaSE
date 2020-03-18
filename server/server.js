const { ApolloServer } = require("apollo-server");

const typeDefs = `

    type Item {
        id: Int
        type: String
        description: String
    }

    type Query{
        items (type: String):[Item]
    }

`;

const items = [
  { id: 1, type: "prefix", description: "Comic" },
  { id: 2, type: "prefix", description: "Graphic" },
  { id: 3, type: "prefix", description: "Book" },
  { id: 4, type: "suffix", description: "Hub" },
  { id: 5, type: "suffix", description: "Station" },
  { id: 6, type: "suffix", description: "Mart" }
];

const resolvers = {
  Query: {
    items(_, args) {
      return items.filter(x => x.type == args.type);
    }
  }
};

const server = new ApolloServer({ typeDefs, resolvers });
server.listen();
