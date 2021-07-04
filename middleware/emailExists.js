const userService = require("../services/user")

/**
 * Check if the user exists for an email address
 * if not, return 404 Not Found
 * Run middleware wherever you need to check if an account exists by email
 */
module.exports = () => {
  return async function (req, res, next) {
    const { email } = req.params
    const user = await userService.getUser(email)
    if (user) {
      return next()
    }
    return res.status(404).json({
      message: "User not found",
    })
  }
}
