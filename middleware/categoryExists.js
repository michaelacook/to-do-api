const categoryService = require("../services/category")

/**
 * Middleware to check if a requested category exists
 * Returns 404 Not Found when no category found
 * Run on /categories routes that request a category
 */
module.exports = () => {
  return async function (req, res, next) {
    const { id } = req.params
    const category = await categoryService.getCategory(id)
    if (!category) {
      return res.status(404).end()
    }
    return next()
  }
}
