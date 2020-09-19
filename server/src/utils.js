// const { NoUnusedVariablesRule } = require('graphql');
const SQL = require('sequelize');

module.exports.createStore = () => {
  const Op = SQL.Op;
  const operatorsAliases = {
    $in: Op.in,
  };

  const db = new SQL('database', 'username', 'password', {
    dialect: 'sqlite',
    storage: './store.sqlite',
    operatorsAliases,
    logging: false,
  });
  
  // test connection
  // db.authenticate().then(() => {
  //   console.log('Connection has been established successfully.');
  // })
  // .catch(err => {
  //   console.error('Unable to connect to the database:', err);
  // });

  const users = db.define('user', {
    id: {
      type: SQL.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    createdAt: SQL.DATE,
    updatedAt: SQL.DATE,
    name: SQL.STRING,
    email: SQL.STRING,
    password: SQL.STRING,
  });

  const guests = db.define('guest', {
    id: {
      type: SQL.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    createdAt: SQL.DATE,
    updatedAt: SQL.DATE,
    name: SQL.STRING,
    email: SQL.STRING,
  });

  const guestbooks = db.define('guestbook', {
    id: {
      type: SQL.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    createdAt: SQL.DATE,
    updatedAt: SQL.DATE,
    title: SQL.INTEGER,
    userId: SQL.INTEGER,
  });

  const messages = db.define('message', {
    id: {
      type: SQL.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    createdAt: SQL.DATE,
    updatedAt: SQL.DATE,
    body: SQL.STRING,
    userId: SQL.INTEGER,
    guestId: SQL.INTEGER,
    guestbookId: SQL.INTEGER,
  });

  const replies = db.define('reply', {
    id: {
      type: SQL.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    createdAt: SQL.DATE,
    updatedAt: SQL.DATE,
    body: SQL.STRING,
    userId: SQL.INTEGER,
    messageId: SQL.INTEGER,
  });

  // register models
  // guestbooks.sync({force: true}) // drops table
  users.sync()
  guests.sync()
  guestbooks.sync()
  messages.sync()
  replies.sync()

  return { users, guests, guestbooks, messages, replies };
};
