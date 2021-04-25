const express = require("express")
const router = express.Router()

const listItemService = require("../services/listItem")
const authMiddleware = require("../middleware/authentication")()
const authorizationMiddleware = require("../middleware/authorization")()
const listItemExistsMiddleware = require("../middleware/listItemExists")()
const validateListItemMiddleware = require("../middleware/validateListItem")()

router.get(
  "/:id",
  authMiddleware,
  authorizationMiddleware,
  listItemExistsMiddleware,
  async (req, res, next) => {
    try {
      const { id } = req.params
      const listItem = await listItemService.getListItem(id)
      return res.status(200).json(listItem)
    } catch (err) {
      next(err)
    }
  }
)

router.post(
  "/",
  authMiddleware,
  authorizationMiddleware,
  validateListItemMiddleware,
  async (req, res, next) => {
    try {
      const { body } = req
      const listItem = await listItemService.createListItem(body)
      return res.status(201).json(listItem)
    } catch (err) {
      next(err)
    }
  }
)

router.put(
  "/:id",
  authMiddleware,
  authorizationMiddleware,
  listItemExistsMiddleware,
  (req, res, next) => {
    if (!Object.keys(req.body).length) {
      return res.status(400).end()
    }
    return next()
  },
  async (req, res, next) => {
    try {
      const { id } = req.params
      const { body } = req
      const listItem = await listItemService.updateListItem(id, body)
      return res.status(200).json(listItem)
    } catch (err) {
      next(err)
    }
  }
)

router.delete(
  "/:id",
  authMiddleware,
  authorizationMiddleware,
  listItemExistsMiddleware,
  async (req, res, next) => {
    try {
      const { id } = req.params
      await listItemService.deleteListItem(id)
      return res.status(204).end()
    } catch (err) {
      next(err)
    }
  }
)

module.exports = router
