import { ApolloClient, InMemoryCache, ApolloProvider, gql } from "@apollo/client";
import React from 'react';
import ReactDOM from 'react-dom';
// import Pages from "./pages";
// import './index.css';
// import App from './App';
// import * as serviceWorker from './serviceWorker';

const client = new ApolloClient({
  uri: "http://localhost:4000/",
  // headers: { authorization: localStorage.getItem('token') || ''},
  cache: new InMemoryCache()
});

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


// ReactDOM.render(
//   <ApolloProvider client={client}>
//     <Pages />
//   </ApolloProvider>,
//   document.getElementById("root")
// );


// ReactDOM.render(
//   <React.StrictMode>
//     <App />
//   </React.StrictMode>,
//   document.getElementById('root')
// );

// // If you want your app to work offline and load faster, you can change
// // unregister() to register() below. Note this comes with some pitfalls.
// // Learn more about service workers: https://bit.ly/CRA-PWA
// serviceWorker.unregister();
