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

    const generalAPI = new GeneralAPI({ store: this.store })
    const { guestbooks, messages, replies } = await generalAPI.getUserData({ userId: id })
    // console.log({ guestbooks, messages, replies })
    return {success: true, me: { id, name, email, guestbooks, messages, replies}, token}
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

  async addMessage({ guestbookId, body, guestName, guestEmail }) {
    const { response, youAreNot } = this.notLoggedIn()
    
    const messageAuthor = { guestId: null, userId: null}
    if (youAreNot) {
      const guest = await this.store.guests.create({ name: guestName, email: guestEmail })
      messageAuthor.guestId = guest.dataValues.id
    } else {
      messageAuthor.userId = this.context.user.id
    }

    const message = await this.store.messages.create({
      guestbookId, body, ...messageAuthor
    })
    const guestbook = await this.store.guestbooks.findByPk(guestbookId);
    return { success: true, message, guestbook }
  }
  
  async addReply({messageId, body}) {
    const { response, youAreNot } = this.notLoggedIn()
    if (youAreNot) return response

    const reply = await this.store.replies.create({
      messageId, body,
      userId: this.context.user.id
    })
    const message = await this.store.messages.findByPk(messageId);
    const guestbook = await this.store.guestbooks.findByPk(message.dataValues.guestbookId);
    return { success: true, reply, message, guestbook }
  }

  async updateMessage({ messageId, body }) {
    const { response, youAreNot } = this.notLoggedIn()
    if (youAreNot) return response

    const message = await this.store.messages.findByPk(messageId);
    message.body = body
    await message.save()
    
    const guestbook = await this.store.guestbooks.findByPk(message.dataValues.guestbookId);
    return { success: true, message, guestbook }
  }
  async updateReply({ replyId, body }) {
    const { response, youAreNot } = this.notLoggedIn()
    if (youAreNot) return response

    const reply = await this.store.replies.findByPk(replyId);
    reply.body = body
    await reply.save()

    const message = await this.store.messages.findByPk(reply.dataValues.messageId);    
    const guestbook = await this.store.guestbooks.findByPk(message.dataValues.guestbookId);
    return { success: true, reply, message, guestbook }
  }

  extractIds(list) {
    return list.map(obj => obj.id)
  }

  async deleteGuestbook({ guestbookId }) {
    // const { response, youAreNot } = this.notLoggedIn()
    // if (youAreNot) return response

    const generalAPI = new GeneralAPI({ store: this.store })
    const { guestbook , messages } = await generalAPI.getGuestbookPage({ guestbookId })
    
    // get ids of related messages and replies
    const messagesIds = this.extractIds(messages)
    const repliesIds = messages.reduce((list, message) => {
      return [...list, ...this.extractIds(message.replies)]
    }, [])
    
    // delete related messages and replies
    await repliesIds.map(async replyId => await this.deleteReply({ replyId }))
    await messagesIds.map(async messageId => await this.deleteMessage({ messageId }))
    
    // delete guestbook
    const guestbookDB = await this.store.guestbooks.findByPk(guestbook.id)
    await guestbookDB.destroy()

    return { success: true }
  }

  async deleteMessage({ messageId }) {
    // const { response, youAreNot } = this.notLoggedIn()
    // if (youAreNot) return response

    const message = await this.store.messages.findByPk(messageId)
    await message.destroy()
    return { success: true }
  }
  async deleteReply({ replyId }) {
    // const { response, youAreNot } = this.notLoggedIn()
    // if (youAreNot) return response

    const reply = await this.store.replies.findByPk(replyId)
    await reply.destroy()
    return { success: true }
  }


}

module.exports = UserAPI;
