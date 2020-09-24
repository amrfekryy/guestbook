import React, { Fragment } from 'react';
import { Router, Link } from '@reach/router';

import Container from '@material-ui/core/Container';
import { Home, Profile, SignUp, Login, GuestBook, NotFound } from './pages'
import UserContextProvider from 'containers/user_context'


export default function Pages() {
  return (
    <UserContextProvider>
      <Container maxWidth="lg" >
        <Router>
          <Home      path="/" />
          <SignUp    path="/signup" />                 
          <Login     path="/login" />                  
          <Profile   path="/profile/:userId" />        
          <GuestBook path="/guestbook/:guestbookId" />
          <NotFound  default />
        </Router>
      </Container>
    </ UserContextProvider>
  );
}
