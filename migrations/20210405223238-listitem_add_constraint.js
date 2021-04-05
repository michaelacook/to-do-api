"use strict"

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.addConstraint("ListItems", {
      fields: ["listId"],
      type: "foreign key",
      name: "listId",
      references: {
        table: "Lists",
        fields: ["id"],
      },
      onUpdate: "cascade",
      onDelete: "cascade",
    })
  },

  down: async (queryInterface, Sequelize) => {
    return queryInterface.removeConstraint("ListItems", "listId")
  },
}
