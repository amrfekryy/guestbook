require('dotenv').config();
const jwt = require('jsonwebtoken');

const { DataSource } = require('apollo-datasource');
const isEmail = require('isemail');
const GeneralAPI = require('./general')

class UserAPI extends DataSource {
  constructor({ store }) {
    super();
    this.store = store;
  }

  initialize(config) {
    this.context = config.context;
  }

  async signup({ name, email, password }) {
    const response = {
      success: false,
      resMessage: '',
      token: null,
    }
    
    let user = await this.store.users.findOne({ where: { email } });
    if (user && user.dataValues && user.dataValues.password)
      return {...response, resMessage: 'Email already exists'};
    
    user = await this.store.users.create({ name, email, password });
    return {...response, success: true}
  }

  async login({ email: emailArg, password }) {
    const response = {
      success: false,
      resMessage: '',
      token: null,
    }
    
    // already logged in ?
    const email =
      this.context && this.context.user ? this.context.user.email : emailArg;

    const user = await this.store.users.findOne({ where: { email } });
    if (!user)
      return {...response, resMessage: "Email doesn't exists"};
    if (user.dataValues.password !== password)
      return {...response, resMessage: "Password incorrect"};
    
    // create token
    const token = jwt.sign({...user.dataValues}, process.env.ACCESS_TOKEN_SECRET)
    const { id, name } = user['dataValues']

    // const generalAPI = new GeneralAPI({ store: this.store })
    // const { guestbooks, messages, replies } = await generalAPI.getUserData({ userId: id })
    // console.log({ guestbooks, messages, replies })
    return {success: true, me: { id, name, email }, token}
  }

  notLoggedIn() {
    const response = {
      success: false,
      resMessage: 'You are not logged in',
    }
    let youAreNot = true
    if (this.context && this.context.user && this.context.user.id)
      youAreNot = false
    
    return { response, youAreNot }
  }

  async addGuestbook(args) {
    const { response, youAreNot } = this.notLoggedIn()
    if (youAreNot) return response

    const guestbook = await this.store.guestbooks.create({...args, userId: this.context.user.id})
    const guestbooks = await this.store.guestbooks.findAll()
    return { success: true, guestbook, guestbooks, userId: this.context.user.id}
  }

  async addMessage({ userId, guestbookId, body, guestName, guestEmail }) {
    const { response, youAreNot } = this.notLoggedIn()
    
    const messageAuthor = { guestId: null, userId: userId}
    if (youAreNot) {
      const guest = await this.store.guests.create({ name: guestName, email: guestEmail })
      messageAuthor.guestId = guest.dataValues.id
    } 
    // else {
    //   messageAuthor.userId = this.context.user.id
    // }

    const message = await this.store.messages.create({
      guestbookId, body, ...messageAuthor
    })
    // const guestbook = await this.store.guestbooks.findByPk(guestbookId);
    return { success: true }
  }
  
  async addReply({ userId, messageId, body }) {
    const { response, youAreNot } = this.notLoggedIn()
    if (youAreNot) return response

    const reply = await this.store.replies.create({
      messageId, body,
      userId: userId
    })
    // const message = await this.store.messages.findByPk(messageId);
    // const guestbook = await this.store.guestbooks.findByPk(message.dataValues.guestbookId);
    return { success: true }
  }

  async updateGuestbook({ id, title, description }) {
    const { response, youAreNot } = this.notLoggedIn()
    if (youAreNot) return response

    const guestbook = await this.store.guestbooks.findByPk(id);
    guestbook.title = title
    guestbook.description = description
    await guestbook.save()
    
    // const guestbook = await this.store.guestbooks.findByPk(message.dataValues.guestbookId);
    return { success: true }
  }

  async updateMessage({ id, body }) {
    const { response, youAreNot } = this.notLoggedIn()
    if (youAreNot) return response

    const message = await this.store.messages.findByPk(id);
    message.body = body
    await message.save()
    
    // const guestbook = await this.store.guestbooks.findByPk(message.dataValues.guestbookId);
    return { success: true }
  }
  async updateReply({ id, body }) {
    const { response, youAreNot } = this.notLoggedIn()
    if (youAreNot) return response
    console.log({ id, body })
    const reply = await this.store.replies.findByPk(id);
    reply.body = body
    await reply.save()

    // const message = await this.store.messages.findByPk(reply.dataValues.messageId);    
    // const guestbook = await this.store.guestbooks.findByPk(message.dataValues.guestbookId);
    return { success: true }
  }

  extractIds(list) {
    return list.map(obj => obj.id)
  }

  async deleteGuestbook({ id }) {
    // const { response, youAreNot } = this.notLoggedIn()
    // if (youAreNot) return response
    
    // get guestbook
    const guestbook = await this.store.guestbooks.findByPk(id)
    // get messages
    const generalAPI = new GeneralAPI({ store: this.store })
    const messages = await generalAPI.getMessagesOf({ guestbookId: id })
    // delete messages
    const messagesIds = this.extractIds(messages)
    await messagesIds.map(async id => await this.deleteMessage({ id }))
    // delete guestbook
    await guestbook.destroy()

    return { success: true }
  }

  async deleteMessage({ id }) {
    // const { response, youAreNot } = this.notLoggedIn()
    // if (youAreNot) return response
    
    // get message
    const message = await this.store.messages.findByPk(id)
    // get replies
    const generalAPI = new GeneralAPI({ store: this.store })
    const replies = await generalAPI.getRepliesOf({ messageId: id })
    // delete replies
    const repliesIds = this.extractIds(replies)
    await repliesIds.map(async id => await this.deleteReply({ id }))
    // delete message
    await message.destroy()
    
    return { success: true }
  }

  async deleteReply({ id }) {
    // const { response, youAreNot } = this.notLoggedIn()
    // if (youAreNot) return response

    const reply = await this.store.replies.findByPk(id)
    await reply.destroy()
    
    return { success: true }
  }


}

module.exports = UserAPI;
