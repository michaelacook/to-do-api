const express = require("express")
const router = express.Router()

const userService = require("../services/user")
const authMiddleWare = require("../middleware/authentication")()
const userExistsMiddleware = require("../middleware/userExists")()
const validateUserMiddleware = require("../middleware/validateUser")()

router.get(
  "/:id",
  authMiddleWare,
  userExistsMiddleware,
  async (req, res, next) => {
    try {
      const id = req.params.id
      const user = await userService.getUserById(id)
      return res.status(200).json(user)
    } catch (err) {
      next(err)
    }
  }
)

router.post("/", validateUserMiddleware, async (req, res, next) => {
  try {
    const { body } = req
    const user = await userService.createUser(body)
    return res.status(201).json(user)
  } catch (err) {
    next(err)
  }
})

router.put(
  "/:id",
  authMiddleWare,
  userExistsMiddleware,
  async (req, res, next) => {
    try {
      const { id } = req.params,
        { body } = req
      const user = await userService.updateUser(id, body)
      return res.status(200).json(user)
    } catch (err) {
      next(err)
    }
  }
)

router.delete("/:id", userExistsMiddleware, async (req, res, next) => {
  try {
    const { id } = req.params
    await userService.deleteUser(id)
    return res.status(204).end()
  } catch (err) {
    next(err)
  }
})

module.exports = router
