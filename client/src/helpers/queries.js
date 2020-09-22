import { gql, useQuery, useMutation } from "@apollo/client";


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
    token
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
// mutation SS{
//   addGuestbook(title:"eshtaaaaaaat") {
//     success,
//     resMessage,
//     guestbooks {
//       title
//     }
//   }
// }
// mutation SS{
//   signup(name:"aa", email:"aa@aa", password:"123") {
//     success,
//     resMessage
//     token
//   }
// }

// query SS{
//   me {
//     name
//   }
// }