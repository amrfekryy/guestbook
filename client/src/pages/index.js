import React, { Fragment } from 'react';
import { Router, Link } from '@reach/router';

import Container from 'containers/main_container'
import Header from 'components/header'
import Home from './home'
import Signup from './signup'
import Login from './login'
import Profile from './profile'
import Guestbook from './guestbook'

const NotFound = () => (
  <div>Sorry, nothing here.</div>
)

export default function Pages() {
  return (
    <Container>
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
  );
}
