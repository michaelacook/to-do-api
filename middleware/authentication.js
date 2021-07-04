// run on protected routes

const auth = require("basic-auth")
const bcrypt = require("bcryptjs")
const userService = require("../services/user")

module.exports = () => {
  /**
   * Parse the HTTP Authorization Header
   * On success call next in middleware chain
   * On fail return 401 status with a message
   */
  return async function (req, res, next) {
    let message
    const credentials = auth(req)
    if (credentials) {
      const { name, pass } = credentials
      const user = await userService.getUser(name)
      if (user) {
        const authed = bcrypt.compareSync(pass, user.password)
        console.log(authed)
        if (authed) {
          req.user = user
          return next()
        } else {
          message = "Incorrect email or password"
        }
      } else {
        message = "User not found"
      }
    }
    return res.status(401).json({ message })
  }
}
