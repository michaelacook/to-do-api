/**
 * Validate client data to create new listItem
 * If data don't contain required properties return 404 Bad Request
 */
module.exports = () => {
  return function (req, res, next) {
    const { body } = req
    if (!body.listId || !body.content) {
      return res.status(400).end()
    }
    return next()
  }
}
