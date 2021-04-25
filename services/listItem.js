const { ListItem } = require("../models/index")

module.exports = {
  /**
   * Get a single list item from the database
   * @param {Number} id - primary key
   * @returns {Promise} listItem
   */
  async getListItem(id) {
    try {
      await ListItem.sync()
      const listItem = await ListItem.findByPk(id)
      return listItem
    } catch (err) {
      return Promise.reject(err)
    }
  },

  /**
   * Create a new list item
   * @param {Object} payload - data to create new list item
   * @returns {Promise} created list item
   */
  async createListItem(payload) {
    try {
      await ListItem.sync()
      const listItem = await ListItem.create(payload)
      return listItem
    } catch (err) {
      return Promise.reject(err)
    }
  },

  /**
   * Update a list item in the database
   * @param {Number} id - primary key
   * @param {Object} payload - data to update listItem
   * @returns {Promise} updated list item
   */
  async updateListItem(id, payload) {
    try {
      await ListItem.sync()
      const listItem = await ListItem.findByPk(id)
      for (let key in payload) {
        listItem[key] = payload[key]
      }
      await listItem.save()
      await listItem.reload()
      return listItem
    } catch (err) {
      return Promise.reject(err)
    }
  },

  /**
   * Hard delete a list item in the database
   * @param {Number} id - primary key
   * @returns {Promise} true
   */
  async deleteListItem(id) {
    try {
      await ListItem.sync()
      const listItem = await ListItem.findByPk(id)
      await listItem.destroy()
      return true
    } catch (err) {
      return Promise.reject(err)
    }
  },
}
