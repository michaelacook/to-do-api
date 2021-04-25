"use strict"
const { Model } = require("sequelize")
module.exports = (sequelize, DataTypes) => {
  class ListItem extends Model {
    static associate({ List }) {
      ListItem.belongsTo(List, {
        foreignKey: "listId",
      })
    }
  }
  ListItem.init(
    {
      listId: DataTypes.INTEGER,
      content: DataTypes.TEXT,
      comments: DataTypes.TEXT,
      complete: DataTypes.BOOLEAN,
    },
    {
      sequelize,
      modelName: "ListItem",
    }
  )
  return ListItem
}
