"use strict"

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.addConstraint("Lists", {
      fields: ["categoryId"],
      type: "foreign key",
      name: "categoryId",
      references: {
        table: "Categories",
        field: "id",
      },
      onUpdate: "cascade",
      onDelete: "cascade",
    })
  },

  down: async (queryInterface, Sequelize) => {
    return queryInterface.removeConstraint("Lists", "categoryId")
  },
}
