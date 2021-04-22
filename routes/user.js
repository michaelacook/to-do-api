const express = require("express")
const router = express.Router()

const userService = require("../services/user")

router.get("/:id", async (req, res, next) => {
  try {
    const id = req.params.id
    const user = await userService.getUserById(id)
    return res.status(200).json(user)
  } catch (err) {
    next(err)
  }
})

module.exports = router
