"use strict"

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert("ListItems", [
      {
        userId: 1,
        listId: 1,
        content: "Finish API",
        comments: "This is a test list item.",
        complete: false,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        userId: 1,
        listId: 1,
        content: "Start client app",
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
