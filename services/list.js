const { Category, List, ListItem } = require("../models/index")
const { Op } = require("sequelize")

module.exports = {
  /**
   * Get a single List and associated ListItems
   * @param {Number} id - List primary key
   * @returns {Promise} list object
   */
  async getList(id) {
    await List.sync()
    return await List.findOne({
      where: {
        id,
      },
      include: {
        model: ListItem,
      },
    })
  },

  /**
   * Get all lists for a category
   * For testing purposes
   * @param {Number} categoryId
   * @returns {Object|Array}
   */
  async _getAllLists(categoryId) {
    await Category.sync()
    const category = await Category.findOne({
      where: {
        id: categoryId,
      },
      include: {
        model: List,
      },
    })
    return category.Lists
  },

  /**
   * Get all pinned to-do lists by user id
   * @param {Number} userId - user PK
   * @returns {Object|Array}
   */
  async getPinnedLists(userId) {
    await List.sync()
    return await List.findAll({
      where: {
        [Op.and]: [{ userId }, { pinned: true }],
      },
      include: {
        model: ListItem,
      },
    })
  },

  /**
   * Add a new to-do list to the database
   * @param {Object} destructured - payload containing categoryId, userId and title
   * @returns {Promise} created list
   */
  async addList({ categoryId, userId, title }) {
    await List.sync()
    return await List.create({
      categoryId,
      userId,
      title,
      pinned: false,
    })
  },

  /**
   * Update a list
   * @param {Object} destructured - payload
   * @returns {Promise} updated list
   */
  async updateList(id, payload) {
    await List.sync()
    const list = await List.findByPk(id)
    for (let key in payload) {
      list[key] = payload[key]
    }
    await list.save()
    await list.reload()
    return list
  },

  /**
   * Hard delete a to do list in the database
   * Because of the foreign key constraint on list items, deleting a list deletes all associated items
   * @param {Number} id - list primary key
   * @returns {Promise} true
   */
  async deleteList(id) {
    await List.sync()
    const list = await List.findByPk(id)
    await list.destroy()
    return true
  },
}
