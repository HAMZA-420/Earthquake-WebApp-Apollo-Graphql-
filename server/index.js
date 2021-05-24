const { ApolloServer } = require('apollo-server');
const typeDefs = require('./schema');
const QuakeAPI = require('./datasources/quake');
const resolvers = require('./resolvers');
const UserAPI = require('./datasources/user');
const {createStore} = require('./utils');

const store = createStore();

const server = new ApolloServer({ 
  
  context: async ({ req }) => {
    // simple auth check on every request
    const auth = req.headers && req.headers.authorization || '';
    const email = Buffer.from(auth, 'base64').toString('ascii');

    // find a user by their email
    const usercheck = await store.users.map(user => {
      if(email === user.email) {
        return user
      }
    });

    let users = []
    await usercheck.forEach(elem => {
      if(elem) {
        users.push(elem)
      }
    })

    const user = users && users[0] ? users[0] : null;
    return { user };
  },
  // Additional constructor options

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
  