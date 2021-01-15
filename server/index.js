const { ApolloServer } = require('apollo-server');
const typeDefs = require('./schema');
const QuakeAPI = require('./datasources/quake');
const resolvers = require('./resolvers');
const UserAPI = require('./datasources/user');
const {createStore} = require('./utils');

const store = createStore();

const server = new ApolloServer({ 
  typeDefs,
  resolvers,
  dataSources: () => ({
    QuakeAPI: new QuakeAPI(),
    UserAPI: new UserAPI({store})
 })
});

server.listen().then(() => {
    console.log(`
      Server is running!
      Listening on port 4000
      Explore at https://studio.apollographql.com/dev
    `);
  });
  