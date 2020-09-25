const { DataSource } = require('apollo-datasource');

class GeneralAPI extends DataSource {
  constructor({ store }) {
    super();
    this.store = store;
  }

  initialize(config) {
    this.context = config.context;
  }

  extractValues(sequelizeResult) {
    const values = Array.isArray(sequelizeResult)
      ? sequelizeResult.length > 0
        ? sequelizeResult.map(obj => obj.dataValues)
        : []
      : sequelizeResult.dataValues
        ? sequelizeResult.dataValues
        : sequelizeResult
    console.log('extractValues', values)
    return values
  }

  async getAllGuestbooks() {
    const guestbooks = await this.store.guestbooks.findAll()
    return this.extractValues(guestbooks)
  }

  async getAllMessages() {
    const messages = await this.store.messages.findAll()
    return this.extractValues(messages)
  }

  async getAllReplies() {
    const replies = await this.store.replies.findAll()
    return this.extractValues(replies)
  }

  async getGuestbooksOf({ userId }) {
    const guestbooks = await this.store.guestbooks.findAll({ where: { userId } })
    return this.extractValues(guestbooks)
  }

  async getMessagesOf({ guestbookId }) {
    const messages = await this.store.messages.findAll({ where: { guestbookId } })
    return this.extractValues(messages)
  }

  async getRepliesOf({ messageId }) {
    const replies = await this.store.replies.findAll({ where: { messageId } })
    return this.extractValues(replies)
  }

  async getGuestbook({ guestbookId }) {
    const guestbook = await this.store.guestbooks.findByPk(guestbookId)
    return this.extractValues(guestbook)
  }

  async getMessage({ messageId }) {
    const message = await this.store.messages.findByPk(messageId)
    return this.extractValues(message)
  }

  async getReply({ replyId }) {
    const reply = await this.store.replies.findByPk(replyId)
    return this.extractValues(reply)
  }

  async getGuestbookPage({ guestbookId }) {
    // console.log(userId)
    const guestbook = await this.getGuestbook({ guestbookId })
    let messages = await this.getMessagesOf({ guestbookId })

    messages = await messages.reduce( async (list, message) => {
      const replies = await this.getRepliesOf({ messageId: message.id })
      list = await list
      return [...list, {...message, replies}]
    }, [])

    console.log({ ...guestbook, messages })
    return { guestbook, messages }
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
