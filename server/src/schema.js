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
    messages: [Message]
  }
  
  type Message {
    id: ID!
    body: String!
    replies: [Reply]!
    user: User
    guest: Guest
    # time: String!
  }
  
  type Reply {
    id: ID!
    body: String!
    user: User!
    # guest: Guest
    # time: String!
  }
  
  ## queries ##

  type Query {
    test: String
    me: User
    guestbooks: [Guestbook]! # for all users
    guestbook(id: ID!): Guestbook # one guestbook
  }
  
  ## mutations ##

  type Mutation {
    
    signup(name: String, email: String, password: String): Response!
    login(email: String, password: String): Response!

    addGuestbook(title: String): Response!

    addMessage(
      guestbookId: ID!
      body: String!
      guestName: String
      guestEmail: String
    ): Response!
    
    addReply(
      messageId: ID! 
      body: String!
    ): Response!
    
    updateMessage(messageId: ID! body: String!): Response!
    updateReply(replyId: ID! body: String!): Response!
    deleteMessage(messageId: ID!): Response!
    deleteReply(replyId: ID!): Response!

  }
  
  type Response {
    success: Boolean!
    resMessage: String
    guestbook: Guestbook
    guestbooks: [Guestbook]
    message: Message
    messages: [Message]
    reply: Reply
    replies: [Reply]
    token: String
    userId: ID
    userName: ID
  }  

`;

module.exports = typeDefs;
