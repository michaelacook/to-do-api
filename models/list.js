"use strict"
const { Model } = require("sequelize")
module.exports = (sequelize, DataTypes) => {
  class List extends Model {
    static associate({ Category, ListItem }) {
      List.belongsTo(Category, {
        foreignKey: "categoryId",
        onDelete: "CASCADE",
      })
      List.hasMany(ListItem, {
        foreignKey: "listId",
        onDelete: "CASCADE",
      })
    }
  }
  List.init(
    {
      categoryId: DataTypes.INTEGER,
      userId: DataTypes.INTEGER,
      title: DataTypes.STRING,
      pinned: DataTypes.BOOLEAN,
    },
    {
      sequelize,
      modelName: "List",
    }
  )
  return List
}
