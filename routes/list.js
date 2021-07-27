const express = require("express")
const router = express.Router()

const listService = require("../services/list")
const authMiddleware = require("../middleware/authentication")()
const listExistsMiddleware = require("../middleware/listExists")()
const validateListMiddleware = require("../middleware/validateList")()
const authorizationMiddleware = require("../middleware/authorization")()

router.get("/pinned", authMiddleware, async (req, res, next) => {
  try {
    const id = req.user.id
    const pinned = await listService.getPinnedLists(id)
    return res.status(200).json(pinned)
  } catch (err) {
    next(err)
  }
})

router.get(
  "/:id",
  authMiddleware,
  authorizationMiddleware,
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

router.put(
  "/:id",
  authMiddleware,
  authorizationMiddleware,
  listExistsMiddleware,
  (req, res, next) => {
    if (!Object.keys(req.body).length) {
      return res.status(400).end()
    } else {
      next()
    }
  },
  async (req, res, next) => {
    try {
      const { body } = req
      const { id } = req.params
      const list = await listService.updateList(id, body)
      return res.status(200).json(list)
    } catch (err) {
      next(err)
    }
  }
)

router.delete(
  "/:id",
  authMiddleware,
  authorizationMiddleware,
  listExistsMiddleware,
  async (req, res, next) => {
    try {
      const { id } = req.params
      await listService.deleteList(id)
      return res.status(204).end()
    } catch (err) {
      next(err)
    }
  }
)

module.exports = router
