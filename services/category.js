const { Category, List, ListItem } = require("../models/index")

module.exports = {
  /**
   * Get all categories and associated lists and list items for a user
   * @param {Number} userId - user id to get categories for
   * @returns {Promise} categories or error
   */
  async getAllCategories(userId) {
    await Category.sync()
    return await Category.findAll({
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
  },

  /**
   * Get a single category with associated Lists and ListItems
   * @param {Number} id - primary key
   * @param {Object|Array} lists
   * @returns {Promise} category object
   */
  async getCategory(id, lists = false) {
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
    return await Category.findOne(options)
  },

  /**
   * Add a new category to the database
   * @param {Object} destructured payload containing userId and title
   * @returns {Promise} created category
   */
  async addCategory({ userId, title }) {
    await Category.sync()
    return await Category.create({
      userId,
      title,
    })
  },

  /**
   * Update a category's title in the database
   * Returns updated category with all associated data
   * @param {Number} id - primary key
   * @param {String} title - new title
   * @returns {Object} updated category
   */
  async updateCategoryTitle(id, title) {
    await Category.sync()
    const category = await Category.findOne({
      where: {
        id: id,
      },
      include: {
        model: List,
        include: {
          model: ListItem,
        },
      },
    })
    category.title = title
    await category.save()
    await category.reload()
    return category
  },

  /**
   * Hard delete a category in the database
   * Because onDelete set to cascade, all associated List and ListItems are deleted as well
   * @param {Number} id - primary key for category
   * @returns {Promise} true
   */
  async deleteCategory(id) {
    await Category.sync()
    const category = await Category.findByPk(id)
    await category.destroy()
    return true
  },
}
