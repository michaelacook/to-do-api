"use strict"

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert("Lists", [
      {
        categoryId: 1,
        userId: 1,
        title: "To Do App",
        pinned: false,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ])
  },

  down: async (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete("Lists", null, {})
  },
}
