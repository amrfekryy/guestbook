import { gql } from "@apollo/client";


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
mutation login($email: String!, $password: String!) {
  login(email: $email, password: $password) {
    success
    resMessage
    userId
    userName
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