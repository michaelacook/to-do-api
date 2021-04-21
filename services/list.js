const { List, ListItem } = require("../models/index")

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
      if (!list) {
        const err = new Error("Not found")
        err.status = 404
        throw err
      }
      return list
    } catch (err) {
      return Promise.reject(err)
    }
  },
}
