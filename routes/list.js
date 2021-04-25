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

router.put(
  "/:id",
  authMiddleware,
  listExistsMiddleware,
  (req, res, next) => {
    if (!req.body.title) {
      return res.status(400).end()
    }
    return next()
  },
  async (req, res, next) => {
    try {
      const { body } = req
      const { id } = req.params
      const list = await listService.updateListTitle(id, body.title)
      return res.status(200).json(list)
    } catch (err) {
      next(err)
    }
  }
)

router.delete(
  "/:id",
  authMiddleware,
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
