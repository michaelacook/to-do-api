/* 
Actions are routines that use services to perform some task in the database or the server filesystem
E.g. initializeAccount is an action run to create some built-in folders when a new user creates an account
Other actions could be file uploads, requests to a third party API or file host service, oauth authorization, etc
*/

const categoryService = require("../services/category")

module.exports = {
  /**
   * Initialize a user account with built-in list folders
   * @param {Object} user - user instance returned from the database
   * @returns {Promise} true
   */
  async initializeAccount(user) {
    try {
      await categoryService.addCategory({
        userId: user.id,
        title: "Work",
      })

      await categoryService.addCategory({
        userId: user.id,
        title: "Home",
      })

      return true
    } catch (err) {
      return Promise.reject(err)
    }
  },
}
