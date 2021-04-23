/**
 * Validate payload from client to create new category
 * Run on category POST routes
 */
module.exports = () => {
  return async function (req, res, next) {
    const { body } = req
    if (!body.userId || !body.title) {
      return res.status(400).end()
    }
    return next()
  }
}
