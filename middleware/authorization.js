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
    const userId = req.user.id,
      { baseUrl } = req

    let id

    if (req.params.id) {
      id = req.params.id
    }

    const messages = {
      GET: "You do not have authorization to access the requested resource.",
      PUT: "You do not have authorization to modify the requested resource.",
      DELETE: "You do not have authorization to delete the requested resource",
    }

    const message = messages[req.method]

    if (baseUrl === "/categories") {
      if (id) {
        const category = await categoryService.getCategory(id)
        if (category) {
          if (category.userId !== userId) {
            return res.status(401).json(message)
          }
        }
      }
    }

    if (baseUrl === "/users") {
      if (id) {
        const user = await userService.getUserById(id)
        if (user) {
          if (user.id !== userId) {
            return res.status(401).json(message)
          }
        }
      }
    }

    if (baseUrl === "/lists") {
      if (id) {
        const list = await listService.getList(id)
        if (list) {
          const category = await categoryService.getCategory(list.categoryId)
          if (category.userId !== userId) {
            return res.status(401).json(message)
          }
        }
      }
    }

    if (baseUrl === "/list-items") {
      if (id) {
        const item = await listItemService.getListItem(id)
        if (item) {
          const list = await listService.getList(item.listId)
          const category = await categoryService.getCategory(list.categoryId)
          if (category.userId !== userId) {
            return res.status(401).json(message)
          }
        }
      }
    }

    return next()
  }
}
