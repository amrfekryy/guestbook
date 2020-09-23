import React, { Fragment } from 'react';
import { Router, Link } from '@reach/router';

import Container from '@material-ui/core/Container';
import Header from 'components/header'
import Home from './home'
import Signup from './signup'
import Login from './login'
import Profile from './profile'
import Guestbook from './guestbook'
import UserContextProvider from 'containers/user_context'

const NotFound = () => (
  <div>Sorry, nothing here.</div>
)

export default function Pages() {
  return (
    <UserContextProvider>
      <Container maxWidth="lg" >
        <Header />
        <Router>
          <Home path="/" />
          <Signup    path="signup" />                 
          <Login     path="login" />                  
          <Profile   path="profile/:userId" />        
          <Guestbook path="guestbook/:guestbookId" />
          <NotFound default />
        </Router>
      </Container>
    </ UserContextProvider>
  );
}
