import { ApolloClient, InMemoryCache, ApolloProvider, gql } from "@apollo/client";
import React from 'react';
import ReactDOM from 'react-dom';
import Pages from "./pages";
// import './index.css';
// import App from './App';

const client = new ApolloClient({
  uri: "http://localhost:4000/",
  // headers: { authorization: localStorage.getItem('token') || ''},
  cache: new InMemoryCache()
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
