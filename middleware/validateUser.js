/**
 * Validate if data sent from client to create user contains required properties
 * Run on POST /users
 */
module.exports = () => {
  return function (req, res, next) {
    const { body } = req
    if (!body.email || !body.password) {
      return res.status(400).json({
        message: "User must have email and password",
      })
    }
    return next()
  }
}
