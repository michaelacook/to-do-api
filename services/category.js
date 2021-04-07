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
      return categories
    } catch (err) {
      return Promise.reject(false)
    }
  },
}
