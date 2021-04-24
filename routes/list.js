const express = require("express")
const router = express.Router()

const listService = require("../services/list")
const authMiddleware = require("../middleware/authentication")()
const listExistsMiddleware = require("../middleware/listExists")()
const validateListMiddleware = require("../middleware/validateList")()

router.get(
  "/:id",
  authMiddleware,
  listExistsMiddleware,
  async (req, res, next) => {
    try {
      const { id } = req.params
      const list = await listService.getList(id)
      return res.status(200).json(list)
    } catch (err) {
      next(err)
    }
  }
)

router.post(
  "/",
  authMiddleware,
  validateListMiddleware,
  async (req, res, next) => {
    try {
      const { body } = req
      const list = await listService.addList(body)
      return res.status(201).json(list)
    } catch (err) {
      next(err)
    }
  }
)

// router.put()

// router.delete()

module.exports = router
