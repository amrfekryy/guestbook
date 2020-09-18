const { gql } = require('apollo-server');

const typeDefs = gql`

  ## object types ##

  type User {
    id: ID!
    name: String!
    email: String!
    guestbooks: [Guestbook]!
    # messages: [Message]!
    # replies: [Reply]!
  }

  type Guest {
    id: ID!
    name: String!
    email: String
    # messages: [Message]!
  }

  type Guestbook {
    id: ID!
    title: String!
    messages: [Message]!
  }
  
  type Message {
    id: ID!
    user: User
    guest: Guest
    body: String!
    time: String!
    replies: [Reply]! 
  }
  
  type Reply {
    id: ID!
    user: User
    # guest: Guest
    body: String!
    time: String!
  }
  
  ## queries ##

  type Query {
    me: User
    guestbooks: [Guestbook]! # for all users
    guestbook(id: ID!): Guestbook # one guestbook
  }
  
  ## mutations ##

  type Mutation {
    
    signup(email: String, password: String): String
    login(email: String, password: String): String # return login token
    
    addGuestbook: addEntityResponse!

    addMessage(guestbookId: ID!): addEntityResponse!
    updateMessage(messageId: ID!): mutateEntityResponse!
    deleteMessage(messageId: ID!): mutateEntityResponse!

    addReply(messageId: ID!): addEntityResponse!
    updateReply(replyId: ID!): mutateEntityResponse!
    deleteReply(replyId: ID!): mutateEntityResponse!

  }
  
  type addEntityResponse {
    success: Boolean!
    message: String
    guestbooks: [Guestbooks]
    messages: [Message]
    replies: [Reply]
  }  

  type mutateEntityResponse {
    success: Boolean!
    message: String
    message: Message
    reply: Reply
  }
`;

module.exports = typeDefs;
