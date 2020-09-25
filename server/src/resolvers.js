module.exports = {

  Query: {
    // test: () => 'hello',
    // me: (_, __, { dataSources }) => dataSources.userAPI.findOrCreateUser()
    allGuestbooks: async (_, __, { dataSources }) => await dataSources.generalAPI.getAllGuestbooks(),
    guestbooksOf: async (_, args, { dataSources }) => await dataSources.generalAPI.getGuestbooksOf(args),
  },

  Mutation: {
    signup: async (_, args, { dataSources }) => await dataSources.userAPI.signup(args),
    login: async (_, args, { dataSources }) => await dataSources.userAPI.login(args),
    addGuestbook: async (_, args, { dataSources }) => await dataSources.userAPI.addGuestbook(args),
    addMessage: async (_, args, { dataSources }) => await dataSources.userAPI.addMessage(args),
    addReply: async (_, args, { dataSources }) => await dataSources.userAPI.addReply(args),
    updateMessage: async (_, args, { dataSources }) => await dataSources.userAPI.updateMessage(args),
    updateReply: async (_, args, { dataSources }) => await dataSources.userAPI.updateReply(args),
    deleteMessage: async (_, args, { dataSources }) => await dataSources.userAPI.deleteMessage(args),
    deleteReply: async (_, args, { dataSources }) => await dataSources.userAPI.deleteReply(args),
  }    
};
