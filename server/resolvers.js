module.exports = {
    Query: {
      quakes: (_, __, { dataSources }) =>
        dataSources.QuakeAPI.getAllQuakes(),
      quake: (_, { id }, { dataSources }) =>
        dataSources.quakeAPI.getQuakeById({ quakeId: id }),
      users: (_, __, {dataSources}) =>
        dataSources.UserAPI.getUsers()
     // me: (_, __, { dataSources }) => dataSources.userAPI.findOrCreateUser()
    }
  };
  