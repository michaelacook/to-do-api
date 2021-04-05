"use strict"

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert("Users", [
      {
        firstName: "Michael",
        lastName: "Cook",
        email: "mcook0775@gmail.com",
        password:
          "$2y$12$he7uC29CboYsYz/hw6nzkuaUxLbR13wS5mynfe8M3LD91Fakcy1mi",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ])
  },

  down: async (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete("Users", null, {})
  },
}
