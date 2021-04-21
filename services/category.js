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

  /**
   * Get a single category with associated Lists and ListItems
   * @param {Number} id - primary key 
   * @param {Object|Array} lists 
   * @returns {Promise} category object
   */
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

  /**
   * Add a new category to the database
   * @param {Object} destructured payload containing userId and title
   * @returns {Promise} id - primary key for created category
   */
  async addCategory({ userId, title }) {
    try {
      await Category.sync()
      const category = await Category.create({
        userId, 
        title
      })
      return category.id
    } catch (err) {
      return Promise.reject(err)
    }
  },

  /**
   * Hard delete a category in the database 
   * Because onDelete set to cascade, all associated List and ListItems are deleted as well
   * @param {Number} id - primary key for category
   * @returns {Promise} true
   */
  async deleteCategory(id) {
    try {
      await Category.sync()
      const category = await Category.findByPk(id) 
      if (!category) {
        const err = new Error("Not found")
        err.status = 404
        return Promise.reject(err)
      }
      await category.destroy()
      return true
    } catch (err) {
      return Promise.reject(err)
    }
  }
}
