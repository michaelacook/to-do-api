const categoryService = require("../services/category")
const listService = require("../services/list")
const listItemService = require("../services/listItem")
const userService = require("../services/user")

/**
 * Run on protected routes
 * Check if the resource the client requests to perform an action on belongs to the user
 * If so, user is authorized, else 401 Unauthorized returned
 */
module.exports = () => {
  return async function (req, res, next) {
    const userId = req.user.id
    const { baseUrl } = req
    let id
    if (req.params.id) {
      id = req.params.id
    }

    if (baseUrl === "categories") {
      if (id) {
        const category = await categoryService.getCategory(id)
        if (category.userId !== userId) {
          return res.status(401).end()
        }
      }
    }

    if (baseUrl === "users") {
      if (id) {
        const user = await userService.getUserById(id)
        if (user.id !== userId) {
          return res.status(401).end()
        }
      }
    }

    if (baseUrl === "lists") {
      if (id) {
        const list = await listService.getList(id)
        const category = await categoryService.getCategory(list.categoryId)
        if (category.userId !== userId) {
          return res.status(401).end()
        }
      }
    }

    if (baseUrl === "list-items") {
      if (id) {
        const item = await listItemService.getItem(id)
        const list = await listService.getList(item.listId)
        const category = await categoryService.getCategory(list.categoryId)
        if (category.userId !== userId) {
          return res.status(401).end()
        }
      }
    }

    return next()
  }
}