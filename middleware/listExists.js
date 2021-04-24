const listService = require("../services/list")

/**
 * Check if a list exists for a given id
 * return 404 Not Found when list does not exist
 * Run on routes that request an operation on a list
 */
module.exports = () => {
  return async function (req, res, next) {
    const { id } = req.params
    const list = await listService.getList(id)
    if (list) {
      return next()
    }
    return res.status(404).end()
  }
}
