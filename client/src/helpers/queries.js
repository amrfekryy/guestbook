import { gql } from "@apollo/client";

export const GUESTBOOKDATA = gql`
fragment GUESTBOOKDATA on Guestbook {
  id
  createdAt
  title
  description
  userId
  user { name }
}
`;
export const MESSAGEDATA = gql`
fragment MESSAGEDATA on Message {
  id
  body
  userId
  guestId
  user { name }
  guest { name }
}
`;
export const REPLYDATA = gql`
fragment REPLYDATA on Reply {
  id
  body
  userId
  user { name }
}
`;


export const SIGNUP = gql`
mutation signup($name: String!, $email: String!, $password: String!) {
  signup(email: $email, name: $name, password: $password) {
    success
    resMessage
    token
  }
}
`;

export const LOGIN = gql`
${GUESTBOOKDATA}
${MESSAGEDATA}
${REPLYDATA}

mutation login($email: String!, $password: String!) {
  login(email: $email, password: $password) {
    success
    resMessage
    me {
      id
      name
      email
      guestbooks {...GUESTBOOKDATA}
      messages {...MESSAGEDATA}
      replies {...REPLYDATA}
    }
    token
  }
}
`;

export const ADDGUESTBOOK = gql`
mutation addGuestbook($title: String!, $description: String!){
  addGuestbook(title: $title, description: $description) {
    success,
    resMessage,
    guestbooks {
      title
      description
    }
  }
}
`;

export const GETALLGUESTBOOKS = gql`
${GUESTBOOKDATA}

query getAllGuestbooks {
  allGuestbooks {
    ...GUESTBOOKDATA
  }
}
`;

export const GETGUESTBOOKSOF = gql`
${GUESTBOOKDATA}

query getGuestbooksOf($userId: ID!){
  guestbooksOf(userId: $userId) {
    ...GUESTBOOKDATA
  }
}
`;

export const GETGUESTBOOKPAGE = gql`
${GUESTBOOKDATA}
${MESSAGEDATA}
${REPLYDATA}

query getGuestbookPage($guestbookId: ID!){
  guestbookPage(guestbookId: $guestbookId) {
    guestbook {
      ...GUESTBOOKDATA
    }
    messages {
      ...MESSAGEDATA
      replies {
        ...REPLYDATA
      }
    }
  }
}
`;

export const DELETEGUESTBOOK = gql`
mutation deleteGuestbook($guestbookId: ID!){
  deleteGuestbook(guestbookId: $guestbookId) {
    success,
    resMessage,
  }
}
`;


// mutation SS{
//   deleteMessage(messageId:1) {
//     success
//   }
// }
// mutation SS{
//   addReply(messageId:1, body:"kkkkkkkkkkkkkkkkkk") {
//     success,
//     resMessage,
//     message {
//       body
//     }
//     guestbook {
//       title
//       id
//     }
//   }
// }

// mutation SS{
//   addMessage(guestbookId:1, body:"kkkkkkkkkkkkkkkkkk", guestName:"Amro") {
//     success,
//     resMessage,
//     message {
//       body
//     }
//     guestbook {
//       title
//       id
//     }
//   }
// }

// query SS{
//   me {
//     name
//   }
// }