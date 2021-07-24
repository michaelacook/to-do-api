const { ListItem } = require("../models/index")

module.exports = {
  /**
   * Get a single list item from the database
   * @param {Number} id - primary key
   * @returns {Promise} listItem
   */
  async getListItem(id) {
    await ListItem.sync()
    return await ListItem.findByPk(id)
  },

  /**
   * Create a new list item
   * @param {Object} payload - data to create new list item
   * @returns {Promise} created list item
   */
  async createListItem(payload) {
    await ListItem.sync()
    return await ListItem.create(payload)
  },

  /**
   * Update a list item in the database
   * @param {Number} id - primary key
   * @param {Object} payload - data to update listItem
   * @returns {Promise} updated list item
   */
  async updateListItem(id, payload) {
    await ListItem.sync()
    const listItem = await ListItem.findByPk(id)
    for (let key in payload) {
      listItem[key] = payload[key]
    }
    await listItem.save()
    await listItem.reload()
    return listItem
  },

  /**
   * Hard delete a list item in the database
   * @param {Number} id - primary key
   * @returns {Promise} true
   */
  async deleteListItem(id) {
    await ListItem.sync()
    const listItem = await ListItem.findByPk(id)
    await listItem.destroy()
    return true
  },
}
