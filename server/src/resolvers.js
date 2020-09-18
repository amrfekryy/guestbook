module.exports = {

  Query: {
    test: () => 'hello',
    me: (_, __, { dataSources }) => 
      dataSources.userAPI.findOrCreateUser()
  },

  Mutation: {
    login: async (_, { email }, { dataSources }) => {
      const user = await dataSources.userAPI.findOrCreateUser({ email });
      if (user) return Buffer.from(email).toString('base64'); // auth token
    },
    addGuestbook: async (_, args, { dataSources }) =>
      await dataSources.userAPI.addGuestbook(args),
    
    // bookTrips: async (_, { launchIds }, { dataSources }) => {
    //   const results = await dataSources.userAPI.bookTrips({ launchIds });
    //   const launches = await dataSources.launchAPI.getLaunchesByIds({
    //     launchIds,
    //   });
  
    //   return {
    //     success: results && results.length === launchIds.length,
    //     message:
    //       results.length === launchIds.length
    //         ? 'trips booked successfully'
    //         : `the following launches couldn't be booked: ${launchIds.filter(
    //             id => !results.includes(id),
    //           )}`,
    //     launches,
    //   };
    // },
    // cancelTrip: async (_, { launchId }, { dataSources }) => {
    //   const result = await dataSources.userAPI.cancelTrip({ launchId });
  
    //   if (!result)
    //     return {
    //       success: false,
    //       message: 'failed to cancel trip',
    //     };
  
    //   const launch = await dataSources.launchAPI.getLaunchById({ launchId });
    //   return {
    //     success: true,
    //     message: 'trip cancelled',
    //     launches: [launch],
    //   };
    // },
  },  
  // custom resolvers for fields that can't be handled by default apollo resolvers
  // Mission: {
  //   // The default size is 'LARGE' if not provided
  //   missionPatch: (mission, { size } = { size: 'LARGE' }) => {
  //     return size === 'SMALL'
  //       ? mission.missionPatchSmall
  //       : mission.missionPatchLarge;
  //   },
  // },
  // Launch: {
  //   isBooked: async (launch, _, { dataSources }) =>
  //     dataSources.userAPI.isBookedOnLaunch({ launchId: launch.id }),
  // },
  // User: {
  //   trips: async (_, __, { dataSources }) => {
  //     // get ids of launches by user
  //     const launchIds = await dataSources.userAPI.getLaunchIdsByUser();
  //     if (!launchIds.length) return [];
  //     // look up those launches by their ids
  //     return (
  //       dataSources.launchAPI.getLaunchesByIds({
  //         launchIds,
  //       }) || []
  //     );
  //   },
  // },      
};
