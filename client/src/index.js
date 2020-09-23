import { ApolloClient, InMemoryCache, ApolloProvider, gql } from "@apollo/client";
import React from 'react';
import ReactDOM from 'react-dom';
import Pages from "./pages";
import './index.css';


export const cache = new InMemoryCache()
export const client = new ApolloClient({
  uri: "http://localhost:4000/",
  headers: { auth_token: localStorage.getItem('token') || ''},
  cache,
});

ReactDOM.render(
  <ApolloProvider client={client}>
    <Pages />
  </ApolloProvider>,
  document.getElementById("root")
);

// // test query
// client.mutate({
//   mutation: gql`
//     mutation TestQuery {
//       login(email:"aa@aa", password:"123") {
//         success,
//         resMessage
//         token
//       }
//     }
//   `
// }).then(result => console.log(result));
