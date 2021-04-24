/**
 * Validate payload from client to create new list
 * Run on list POST routes
 */
module.exports = () => {
  return function (req, res, next) {
    const { categoryId, title } = req.body
    if (!categoryId || !title) {
      return res.status(400).end()
    }
    return next()
  }
}
