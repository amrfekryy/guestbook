const { DataSource } = require('apollo-datasource');

class GeneralAPI extends DataSource {
  constructor({ store }) {
    super();
    this.store = store;
  }

  initialize(config) {
    this.context = config.context;
  }

  async getUser({ userId }) {
    const user = await this.store.users.findByPk(userId)
    return user ? this.extractValues(user) : user
  }

  async getGuest({ guestId }) {
    const guest = await this.store.guests.findByPk(guestId)
    return guest ? this.extractValues(guest) : guest
  }

  async addUserOrGuest(data) {

    if (Array.isArray(data) && data.length > 0) {
      return await data.reduce( async (list, obj) => {        
        // get user or guest
        const user = await this.getUser({ userId: obj.userId })
        const guest = await this.getGuest({ guestId: obj.guestId })
        // console.log(obj.userId, obj.guestId, user, guest)
  
        list = await list
        return [...list, {...obj, user, guest}]
      }, [])  
    } else {
      const user = await this.getUser({ userId: data.userId })
      const guest = await this.getGuest({ guestId: data.guestId })
      if (user || guest) return {...data, user, guest}
      else return data
    }
  }


  extractValues(sequelizeResult) {
    let values = Array.isArray(sequelizeResult)
      ? sequelizeResult.length > 0
        ? sequelizeResult.map(obj => obj.dataValues)
        : []
      : sequelizeResult.dataValues
        ? sequelizeResult.dataValues
        : sequelizeResult

    return values
  }

  async getAllGuestbooks() {
    let guestbooks = await this.store.guestbooks.findAll()
    guestbooks = this.extractValues(guestbooks)
    return await this.addUserOrGuest(guestbooks)
  }

  async getAllMessages() {
    let messages = await this.store.messages.findAll()
    messages = this.extractValues(messages)
    return await this.addUserOrGuest(messages)
  }

  async getAllReplies() {
    let replies = await this.store.replies.findAll()
    replies = this.extractValues(replies)
    return await this.addUserOrGuest(replies)
  }

  async getGuestbooksOf({ userId }) {
    let guestbooks = await this.store.guestbooks.findAll({ where: { userId } })
    guestbooks = this.extractValues(guestbooks)
    return await this.addUserOrGuest(guestbooks)
  }

  async getMessagesOf({ guestbookId }) {
    let messages = await this.store.messages.findAll({ where: { guestbookId } })
    messages = this.extractValues(messages)
    return await this.addUserOrGuest(messages)
  }

  async getRepliesOf({ messageId }) {
    let replies = await this.store.replies.findAll({ where: { messageId } })
    replies = this.extractValues(replies)
    return await this.addUserOrGuest(replies)
  }

  async getGuestbook({ guestbookId }) {
    let guestbook = await this.store.guestbooks.findByPk(guestbookId)
    guestbook = this.extractValues(guestbook)
    return await this.addUserOrGuest(guestbook)
  }

  async getMessage({ messageId }) {
    let message = await this.store.messages.findByPk(messageId)
    message = this.extractValues(message)
    return await this.addUserOrGuest(message)
  }

  async getReply({ replyId }) {
    let reply = await this.store.replies.findByPk(replyId)
    reply = this.extractValues(reply)
    return await this.addUserOrGuest(reply)
  }

  async getGuestbookPage({ guestbookId }) {
    // console.log('ffffffffff', guestbookId)
    let guestbook = await this.getGuestbook({ guestbookId })
    
    let messages = await this.getMessagesOf({ guestbookId })
    messages = await messages.reduce( async (list, message) => {
      
      let replies = await this.getRepliesOf({ messageId: message.id })
            
      list = await list
      return [...list, {...message, replies}]
    }, [])

    // console.log({ ...guestbook, messages })
    return { guestbook , messages }
  }

  async getUserData({ userId }) {
    // console.log(userId)
    const guestbooks = await this.getGuestbooksOf({ userId })

    const messages = await guestbooks.reduce( async (list, guestbook) => {
      const messages = await this.getMessagesOf({ guestbookId: guestbook.id })
      list = await list
      // console.log('TEST', messages, list)
      return [...list, ...messages]
    }, [])

    const replies = await messages.reduce( async (list, message) => {
      const replies = await this.getRepliesOf({ messageId: message.id })
      list = await list
      return [...list, ...replies]
    }, [])

    // console.log({ guestbooks, messages, replies })
    return { guestbooks, messages, replies }
  }

}

module.exports = GeneralAPI;
