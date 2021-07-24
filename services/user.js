const { User } = require("../models/index")
const bcrypt = require("bcryptjs")

module.exports = {
  /**
   * Retrieve a user from the database
   * @param {String} email - user email
   * @returns {Promise} user object
   */
  async getUser(email) {
    await User.sync()
    return await User.findOne({
      where: {
        email,
      },
    })
  },

  /**
   * Retrieve a user from the database by primary key
   * @param {Number} id - user primary key
   * @returns {Promise} user object
   */
  async getUserById(id) {
    await User.sync()
    return await User.findByPk(id)
  },

  /**
   * Get all users in the database
   * Private method. Used for testing purposes
   * @returns {Object|Array} users
   */
  async _getAllUsers() {
    return await User.findAll()
  },

  /**
   * Add a user to the database
   * @param {Object} payload - user properties
   * @returns {Promise} created user object
   */
  async createUser(payload) {
    await User.sync()
    payload.password = bcrypt.hashSync(payload.password, 8)
    return await User.create({
      email: payload.email,
      password: payload.password,
      firstName: payload.firstName,
      lastName: payload.lastName,
    })
  },

  /**
   * Update a user in the database
   * @param {Number} id - user primary key
   * @param {Object} payload - new data
   * @returns {Promise} true
   */
  async updateUser(id, payload) {
    await User.sync()
    const user = await User.findByPk(id)
    for (let key in payload) {
      if (key === "password") {
        user[key] = bcrypt.hashSync(payload[key], 8)
        await user.save()
        break
      }
      user[key] = payload[key]
      await user.save()
    }
    await user.reload()
    return user
  },

  /**
   * Hard delete a user in the database
   * Because of constraints, all user data is also deleted
   * @param {Number} id - user primary key
   * @returns {Promise} true
   */
  async deleteUser(id) {
    await User.sync()
    const user = await User.findByPk(id)
    await user.destroy()
    return true
  },
}
