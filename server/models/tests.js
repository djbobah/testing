"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Tests extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Tests.init(
    {
      // login: DataTypes.STRING,
      // password: DataTypes.STRING,
      authorId: DataTypes.INTEGER,
      testName: DataTypes.STRING,
      description: DataTypes.STRING,
      timeOfTest: DataTypes.INTEGER,
      numberOfQuestionsForTest: DataTypes.INTEGER,
      isRandomQuestions: DataTypes.BOOLEAN,
      isPublished: DataTypes.BOOLEAN,
    },
    {
      sequelize,
      modelName: "Tests",
    }
  );

  return Tests;
};
