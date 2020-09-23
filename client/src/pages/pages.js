import React from 'react';
import Guestbook from 'components/guestbook'
import Form from 'components/forms/user';
import Guestbooks from 'components/guestbooks'
import Header from 'components/header'

export const Page = (props) => <div><Header />{props.children}</div>

export const Home = () => <Page> <Guestbooks /> </Page>

export const Profile = (props) => <Page> <Guestbooks userId={props.userId} /> </Page>

export const SignUp = () => <Page> <Form formType='signup'/> </Page>

export const Login = () => <Page> <Form formType='login'/> </Page>

export const GuestBook = (props) => <Page> <Guestbook guestbookId={props.guestbookId} /> </Page>
export const NotFound = () => <Page> <div>Sorry, nothing here.</div> </Page>
