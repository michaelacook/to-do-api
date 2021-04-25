const listItemService = require("../services/listItem")

/**
 * Check if requested listItem exists
 * if not return 404 Not Found
 * Run on routes that request a listItem
 */
module.exports = () => {
  return async function (req, res, next) {
    const { id } = req.params
    const listItem = await listItemService.getListItem(id)
    if (listItem) {
      return next()
    }
    return res.status(404).end()
  }
}
