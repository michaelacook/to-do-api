const { User } = require("../models/index")
const bcrypt = require("bcryptjs")

module.exports = {
  /**
   * Retrieve a user from the database
   * @param {String} email - user email
   * @returns {Promise} user object
   */
  async getUser(email) {
    try {
      await User.sync()
      const user = await User.findOne({
        where: {
          email,
        },
      })
      return user
    } catch (err) {
      return Promise.reject(err)
    }
  },

  /**
   * Retrieve a user from the database by primary key
   * @param {Number} id - user primary key
   * @returns {Promise} user object
   */
  async getUserById(id) {
    try {
      await User.sync()
      const user = await User.findByPk(id)
      return user
    } catch (err) {
      return Promise.reject(err)
    }
  },

  /**
   * Add a user to the database
   * @param {Object} payload - user properties
   * @returns {Promise} created user object
   */
  async createUser(payload) {
    try {
      await User.sync()
      payload.password = bcrypt.hashSync(payload.password, 8)
      const user = await User.create({
        email: payload.email,
        password: payload.password,
        firstName: payload.firstName,
        lastName: payload.lastName,
      })
      return user
    } catch (err) {
      return Promise.reject(err)
    }
  },

  /**
   * Update a user in the database
   * @param {Number} id - user primary key
   * @param {Object} payload - new data
   * @returns {Promise} true
   */
  async updateUser(id, payload) {
    try {
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
    } catch (err) {
      return Promise.reject(err)
    }
  },

  /**
   * Hard delete a user in the database
   * Because of constraints, all user data is also deleted
   * @param {Number} id - user primary key
   * @returns {Promise} true
   */
  async deleteUser(id) {
    try {
      await User.sync()
      const user = await User.findByPk(id)
      await user.destroy()
      return true
    } catch (err) {
      return Promise.reject(err)
    }
  },
}
