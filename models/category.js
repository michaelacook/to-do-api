"use strict"
const { Model } = require("sequelize")
module.exports = (sequelize, DataTypes) => {
  class Category extends Model {
    static associate({ List, User }) {
      Category.belongsTo(User, {
        foreignKey: "userId",
      })
      Category.hasMany(List, {
        foreignKey: "categoryId",
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
