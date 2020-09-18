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

  return { users, guestbooks, messages, replies };
};
