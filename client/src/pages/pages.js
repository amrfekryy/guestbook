import React from 'react';
import Guestbook from 'components/guestbook'
import FormControl from 'components/forms/form_control';
import Guestbooks from 'components/guestbooks'
import Header from 'components/header'

export const Page = (props) => <div><Header />{props.children}</div>

export const Home = () => <Page> <Guestbooks /> </Page>

export const Profile = (props) => <Page> <Guestbooks type='profile' userId={props.userId}/> </Page>

export const SignUp = () => <Page> <FormControl settings='signup'/> </Page>

export const Login = () => <Page> <FormControl settings='login'/> </Page>

export const GuestBook = (props) => <Page> <Guestbook guestbookId={props.guestbookId} /> </Page>

export const NotFound = () => <Page> <div>Sorry, nothing here.</div> </Page>
