const { ApolloServer } = require("apollo-server");
const dns = require("dns");

const typeDefs = `

    type Item {
        id: Int
        type: String
        description: String
    }

    type Domain{
      name: String
      checkout: String
      available: Boolean
    }

    type Query{
        items (type: String):[Item]
    }

    input ItemInput{
      type: String
      description: String
    }

    type Mutation{
      saveItem(item: ItemInput): Item
      deleteItem(id: Int): Boolean
      generateDomains: [Domain]
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

const isDomainAvailable = function(url) {
  return new Promise(function(resolve, reject) {
    dns.resolve(url, function(error) {
      if (error) {
        resolve(true);
      } else {
        resolve(false);
      }
    });
  });
};

const resolvers = {
  Query: {
    items(_, args) {
      return items.filter(x => x.type == args.type);
    }
  },
  Mutation: {
    saveItem(_, args) {
      const item = args.item;
      item.id = items[items.length - 1].id + 1;
      items.push(item);
      return item;
    },
    deleteItem(_, args) {
      const id = args.id;
      const item = items.find(item => item.id === id);
      if (!item) return false;
      items.splice(items.indexOf(item), 1);
      return true;
    },
    async generateDomains() {
      const domains = [];

      var i = 0;

      for (const prefix of items.filter(item => item.type === "prefix")) {
        for (const suffix of items.filter(item => item.type === "suffix")) {
          const name = prefix.description + suffix.description;
          const url = name.toLowerCase();
          const checkout = `https://checkout.hostgator.com.br/?a=add&sld=${url}&tld=.com.br`;
          const available = await isDomainAvailable(`${url}.com.br`);
          console.log(`${url}.com.br --- ${available}`);
          domains.push({
            name,
            checkout,
            available
          });
        }
      }
      return domains;
    }
  }
};

const server = new ApolloServer({ typeDefs, resolvers });
server.listen();
