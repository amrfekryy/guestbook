require('dotenv').config();

const { DataSource } = require('apollo-datasource');
const isEmail = require('isemail');
const jwt = require('jsonwebtoken');

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
    
    if (!email || !password || !name) 
      return {...response, resMessage: 'username, email or password is missing'};
    if (!isEmail.validate(email))
      return {...response, resMessage: 'Email is invalid'};
    let user = await this.store.users.findOne({ where: { email } });
    if (user)
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

    if (!email || !password ) 
      return {...response, resMessage: 'Email or password is missing'};
    if (!isEmail.validate(email))
      return {...response, resMessage: 'Email is invalid'};
    const user = await this.store.users.findOne({ where: { email } });
    if (!user)
      return {...response, resMessage: "Email doesn't exists"};
    if (user.dataValues.password !== password)
      return {...response, resMessage: "Password incorrect"};
    
    // create token
    const token = jwt.sign({...user.dataValues}, process.env.ACCESS_TOKEN_SECRET)
    return {...response, success: true, token}
  }

  async addGuestbook(data) {
    // const userId = this.context.user.id;
    // if (!userId) return;
    const response = {
      success: false,
      resMessage: '',
      guestbooks: [],
    }
    if (!this.context || !this.context.user.id) return {...response, resMessage: 'You are not logged in'}
    const guestbook = await this.store.guestbooks.create({...data, userId: this.context.user.id})
    const guestbooks = await this.store.guestbooks.findAll()
    return {...response, success: true, guestbooks}
  }

  async addMessage() {}
  async updateMessage({ messageId }) {}
  async deleteMessage({ messageId }) {}

  async addReply() {}
  async updateReply({ replyId }) {}
  async deleteReply({ replyId }) {}


  // async bookTrips({ launchIds }) {
  //   const userId = this.context.user.id;
  //   if (!userId) return;

  //   let results = [];

  //   // for each launch id, try to book the trip and add it to the results array
  //   // if successful
  //   for (const launchId of launchIds) {
  //     const res = await this.bookTrip({ launchId });
  //     if (res) results.push(res);
  //   }

  //   return results;
  // }

  // async bookTrip({ launchId }) {
  //   const userId = this.context.user.id;
  //   const res = await this.store.trips.findOrCreate({
  //     where: { userId, launchId },
  //   });
  //   return res && res.length ? res[0].get() : false;
  // }

  // async cancelTrip({ launchId }) {
  //   const userId = this.context.user.id;
  //   return !!this.store.trips.destroy({ where: { userId, launchId } });
  // }

  // async getLaunchIdsByUser() {
  //   const userId = this.context.user.id;
  //   const found = await this.store.trips.findAll({
  //     where: { userId },
  //   });
  //   return found && found.length
  //     ? found.map(l => l.dataValues.launchId).filter(l => !!l)
  //     : [];
  // }

  // async isBookedOnLaunch({ launchId }) {
  //   if (!this.context || !this.context.user) return false;
  //   const userId = this.context.user.id;
  //   const found = await this.store.trips.findAll({
  //     where: { userId, launchId },
  //   });
  //   return found && found.length > 0;
  // }
}

module.exports = UserAPI;
