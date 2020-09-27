import React from 'react';
import ReactDOM from 'react-dom';
import Pages from "./pages";
import './index.css';
import { ApolloClient, InMemoryCache, createHttpLink, ApolloProvider, gql } from "@apollo/client";
import { setContext } from '@apollo/client/link/context';

const httpLink = createHttpLink({ uri: 'http://localhost:4000/' });
const authLink = setContext((_, { headers }) => {
  const token = localStorage.getItem('token');
  return {
    headers: { ...headers, auth_token: token ? token : ""}
  }
});

export const cache = new InMemoryCache()
export const client = new ApolloClient({
  link: authLink.concat(httpLink),
  cache,
  // uri: "http://localhost:4000/",
  // headers: { auth_token: localStorage.getItem('token') || ''},
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
