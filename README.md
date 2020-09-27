# guestbook
Simple guestbook application built with GraphQL and React

#### What is a guestbook ?
A guestbook is a paper or electronic means for a visitor to acknowledge a visit to a site, physical or web-based, and leave comments to the guestbook creator.

#### Run Project
- `cd client`, `npm install`, `npm start`
- `cd server`, `npm install`, `npm start`

#### Project features
This is a fully CRUD capable application with signup and login system where users can CRUD guestbooks, messages and message replies.

#### Authorities
###### A logged-in user can:
- Read all guestbooks including messages and replies
- Create a guestbook and update/delete owned guestbooks
- Add messages and replies to any guestbook
- Update/delete owned messages and replies
###### A guest can:
- Read all guestbooks including messages and replies
- Add messages to any guestbook

#### Technologies Used
- `Reactjs` client and `Nodejs` server with `Apollo-GraphQL` API for data exchange
- `Sequelize` ORM connected to a `SQLite` database
- `JWT` for user authentication
- `Formik` for form handling and `Yup` for form validation
- `Material UI` for user interface components and `Ant design` for notifications

#### Features to be added
- Allaw user to upload guestbook image
- Adjust entry forms sizes
- Improve aesthetics in general

#### Known Bugs
- Server error when deleting a guestbook from guestbook page
