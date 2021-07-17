const { Category, List, ListItem } = require("../models/index")

module.exports = {
  /**
   * Get a single List and associated ListItems
   * @param {Number} id - List primary key
   * @returns {Promise} list object
   */
  async getList(id) {
    try {
      await List.sync()
      const list = await List.findOne({
        where: {
          id,
        },
        include: {
          model: ListItem,
        },
      })
      return list
    } catch (err) {
      return Promise.reject(err)
    }
  },

  /**
   * Get all lists for a category
   * For testing purposes
   * @param {Number} categoryId
   * @returns {Object|Array}
   */
  async _getAllLists(categoryId) {
    try {
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
    } catch (err) {
      Promise.reject(err)
    }
  },

  /**
   * Add a new to-do list to the database
   * @param {Object} destructured - payload containing categoryId and title
   * @returns {Promise} created list
   */
  async addList({ categoryId, title }) {
    try {
      await List.sync()
      const list = await List.create({
        categoryId,
        title,
        pinned: false,
      })
      return list
    } catch (err) {
      return Promise.reject(err)
    }
  },

  /**
   * Update a list
   * @param {Object} destructured - payload
   * @returns {Promise} updated list
   */
  async updateList(id, payload) {
    try {
      await List.sync()
      const list = await List.findByPk(id)
      for (let key in payload) {
        list[key] = payload[key]
      }
      await list.save()
      await list.reload()
      return list
    } catch (err) {
      return Promise.reject(err)
    }
  },

  /**
   * Hard delete a to do list in the database
   * Because of the foreign key constraint on list items, deleting a list deletes all associated items
   * @param {Number} id - list primary key
   * @returns {Promise} true
   */
  async deleteList(id) {
    try {
      await List.sync()
      const list = await List.findByPk(id)
      await list.destroy()
      return true
    } catch (err) {
      return Promise.reject(err)
    }
  },
}
