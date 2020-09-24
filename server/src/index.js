require('dotenv').config();
const jwt = require('jsonwebtoken');

const { ApolloServer } = require('apollo-server');
const isEmail = require('isemail');

const typeDefs = require('./schema');
const resolvers = require('./resolvers');
const { createStore } = require('./utils');

const GeneralAPI = require('./datasources/general');
const UserAPI = require('./datasources/user');

const store = createStore();

const server = new ApolloServer({

  context: async ({ req }) => {
    // simple jwt auth check on every request
    const token = req.headers && req.headers.auth_token || '';
    if (!token) return { user: null };

    const data = await jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, async (err, decoded_token) => {
      if (err) return { user: null };
      const user = await store.users.findOne({ where: { email: decoded_token.email } });
      return { user: { ...user.dataValues } };
    })
    console.log('CONTEXT', data)
    return data
  },

  typeDefs,
  resolvers,
  dataSources: () => ({
    generalAPI: new GeneralAPI({ store }),
    userAPI: new UserAPI({ store }), 
  }),
  engine: {    
    reportSchema: true,
    variant: "current",
    graphVariant: "current",    
  }
});

server.listen().then(({ url }) => {
  console.log(`Server ready at ${url}`);
});
