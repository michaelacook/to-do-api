const { Category, List, ListItem } = require("../models/index")

module.exports = {
  /**
   * Get all categories and associated lists and list items for a user
   * @param {Number} userId - user id to get categories for
   * @returns {Promise} categories or error
   */
  async getAllCategories(userId) {
    try {
      await Category.sync()
      const categories = await Category.findAll({
        where: {
          userId,
        },
        include: {
          model: List,
          include: {
            model: ListItem,
          },
        },
      })
      if (!categories) {
        const err = new Error("Not found")
        err.status = 404
        return Promise.reject(err)
      }
      return categories
    } catch (err) {
      return Promise.reject(err.message)
    }
  },

  async getCategory(id, lists = false) {
    try {
      await Category.sync()
      const options = {
        where: {
          id,
        },
        include: {
          model: List,
          include: {
            model: ListItem,
          },
        },
      }
      const category = await Category.findOne(options)
      if (!category) {
        const err = new Error("Not found")
        err.status = 404
        return Promise.reject(err)
      }
      return category
    } catch (err) {
      return Promise.reject(err.message)
    }
  },
}
