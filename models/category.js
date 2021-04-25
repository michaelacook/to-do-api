"use strict"
const { Model } = require("sequelize")
module.exports = (sequelize, DataTypes) => {
  class Category extends Model {
    static associate({ List, User }) {
      Category.belongsTo(User, {
        foreignKey: "userId",
        onDelete: "CASCADE",
      })
      Category.hasMany(List, {
        foreignKey: "categoryId",
        onDelete: "CASCADE",
      })
    }
  }
  Category.init(
    {
      userId: DataTypes.INTEGER,
      title: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "Category",
    }
  )
  return Category
}
