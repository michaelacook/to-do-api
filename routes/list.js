const express = require("express")
const router = express.Router()

const listService = require("../services/list")
const authMiddleware = require("../middleware/authentication")()
const listExistsMiddleware = require("../middleware/listExists")()

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

// router.post()

// router.put()

// router.delete()

module.exports = router
