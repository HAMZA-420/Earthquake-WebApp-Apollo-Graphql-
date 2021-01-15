const { ApolloServer } = require('apollo-server');
const typeDefs = require('./schema');
const QuakeAPI = require('./datasources/quake');

const server = new ApolloServer({ 
  typeDefs,
  dataSources: () => ({
    QuakeAPI: new QuakeAPI(),
 })
});

server.listen().then(() => {
    console.log(`
      Server is running!
      Listening on port 4000
      Explore at https://studio.apollographql.com/dev
    `);
  });
  