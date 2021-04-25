"use strict"

// demo user purely for testing purposes
module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert("Users", [
      {
        firstName: "Demo",
        lastName: "User",
        email: "email@email.com",
        password: "asdfasdf",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ])
  },

  down: async (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete("Users", null, {})
  },
}
