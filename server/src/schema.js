const { gql } = require('apollo-server');

const typeDefs = gql`

  ## object types ##

  type User {
    id: ID!
    name: String!
    email: String!
    guestbooks: [Guestbook]
    messages: [Message]
    replies: [Reply]
  }

  type Guest {
    id: ID!
    name: String
    email: String
    # messages: [Message]
  }

  type Guestbook {
    id: ID!
    createdAt: String
    title: String!
    description: String!
    messages: [Message]
    userId: String
    user: User
  }
  
  type Message {
    id: ID!
    body: String!
    replies: [Reply]
    userId: ID
    guestId: ID
    user: User
    guest: Guest
  }
  
  type Reply {
    id: ID!
    body: String!
    userId: ID
    user: User
  }

  type GuestbookPage {
    guestbook: Guestbook
    messages: [Message]
  }


  ## queries ##

  type Query {
    me: User
    allGuestbooks: [Guestbook]!
    guestbooksOf(userId: ID!): [Guestbook]!
    guestbook(id: ID!): Guestbook 
    guestbookPage(guestbookId: ID!): GuestbookPage
  }
  
  ## mutations ##

  type Mutation {
    
    signup(name: String, email: String, password: String): Response!
    login(email: String, password: String): Response!

    addGuestbook(title: String, description: String): Response!

    addMessage(
      userId: ID
      guestbookId: ID!
      body: String!
      guestName: String
      guestEmail: String
    ): Response!
    
    addReply(
      messageId: ID! 
      body: String!
    ): Response!
    
    updateGuestbook(id: ID!, title: String!, description: String!): Response!
    updateMessage(id: ID! body: String!): Response!
    updateReply(id: ID! body: String!): Response!

    deleteGuestbook(guestbookId: ID!): Response!
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
    me: User
    token: String
  }
`;

module.exports = typeDefs;
