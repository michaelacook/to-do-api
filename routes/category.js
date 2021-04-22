const express = require("express")
const router = express.Router()

const categoryService = require("../services/category")
const authMiddleWare = require("../middleware/authentication")()

router.get("/", authMiddleWare, async (req, res, next) => {
  try {
    const { id } = req.user
    const categories = await categoryService.getAllCategories(id)
    return res.status(200).json(categories)
  } catch (err) {
    next(err)
  }
})

module.exports = router
