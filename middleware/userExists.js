const userService = require("../services/user")

/**
 * Check if the user exists for an id
 * if not, return 404 Not Found
 * Run middleware on routes to retrieve or delete a user
 */
module.exports = () => {
  return async function (req, res, next) {
    const { id } = req.params
    const user = await userService.getUserById(id)
    if (user) {
      return next()
    }
    return res.status(404).end()
  }
}
