import React, { Fragment } from 'react';
import { Router, Link } from '@reach/router';

import Header from 'components/header'
import Home from './home'
import Signup from './signup'
import Login from './login'
import Profile from './profile'
import Guestbook from './guestbook'

export default function Pages() {
  return (
    <Fragment>
      <Header />
      <Router>
        <Home path="/" />
        <Signup    path="signup" />                 
        <Login     path="login" />                  
        <Profile   path="profile/:userId" />        
        <Guestbook path="guestbook/:guestbookId" /> 
      </Router>
    </Fragment>
  );
}
