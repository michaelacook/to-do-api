const express = require("express")
const router = express.Router()

const categoryService = require("../services/category")
const authMiddleWare = require("../middleware/authentication")()
const categoryExistsMiddleWare = require("../middleware/categoryExists")()
const validateCategoryMiddleware = require("../middleware/validateCategory")()

router.get("/", authMiddleWare, async (req, res, next) => {
  try {
    const { id } = req.user
    const categories = await categoryService.getAllCategories(id)
    return res.status(200).json(categories)
  } catch (err) {
    next(err)
  }
})

router.get(
  "/:id",
  authMiddleWare,
  categoryExistsMiddleWare,
  async (req, res, next) => {
    try {
      const { id } = req.params
      const category = await categoryService.getCategory(id)
      return res.status(200).json(category)
    } catch (err) {
      next(err)
    }
  }
)

router.post(
  "/",
  authMiddleWare,
  validateCategoryMiddleware,
  async (req, res, next) => {
    try {
      const { body } = req
      const category = await categoryService.addCategory(body)
      return res.status(201).json(category)
    } catch (err) {
      next(err)
    }
  }
)

router.put(
  "/:id",
  authMiddleWare,
  categoryExistsMiddleWare,
  (req, res, next) => {
    if (!req.body.title) {
      return res.status(400).end()
    }
    return next()
  },
  async (req, res, next) => {
    try {
      const { id } = req.params
      const {
        body: { title },
      } = req
      const category = await categoryService.updateCategoryTitle(id, title)
      return res.status(200).json(category)
    } catch (err) {
      next(err)
    }
  }
)

router.delete(
  "/:id",
  authMiddleWare,
  categoryExistsMiddleWare,
  async (req, res, next) => {
    try {
      const { id } = req.params
      await categoryService.deleteCategory(id)
      return res.status(204).end()
    } catch (err) {
      next(err)
    }
  }
)

module.exports = router
