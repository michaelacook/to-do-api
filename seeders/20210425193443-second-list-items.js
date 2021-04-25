"use strict"

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert("ListItems", [
      {
        listId: 2,
        content: "Do A Thing",
        comments: "This is a test list item.",
        complete: false,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        listId: 2,
        content: "Do Another Thing",
        comments: "This is another test list item.",
        complete: false,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ])
  },

  down: async (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete("ListItems", null, {})
  },
}
