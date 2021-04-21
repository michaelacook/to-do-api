"use strict"
const { Model } = require("sequelize")
module.exports = (sequelize, DataTypes) => {
  class List extends Model {
    static associate({ Category, User, ListItem }) {
      List.belongsTo(Category, {
        foreignKey: "categoryId",
      })
      List.hasMany(ListItem, {
        foreignKey: "listId",
      })
    }
  }
  List.init(
    {
      categoryId: DataTypes.INTEGER,
      title: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "List",
    }
  )
  return List
}
