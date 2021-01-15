module.exports = {
    Query: {
      quakes: (_, __, { dataSources }) =>
        dataSources.QuakeAPI.getAllQuakes(),
      quake: (_, { id }, { dataSources }) =>
        dataSources.quakeAPI.getQuakeById({ quakeId: id }),
     // me: (_, __, { dataSources }) => dataSources.userAPI.findOrCreateUser()
    }
  };
  