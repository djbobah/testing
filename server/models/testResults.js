"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class TestResults extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  TestResults.init(
    {
      // login: DataTypes.STRING,
      idUser: DataTypes.INTEGER,
      idTest: DataTypes.INTEGER,
      questionsForTest: DataTypes.TEXT("long"),
      answersForTest: DataTypes.TEXT("long"),
      userAnswers: DataTypes.TEXT("long"),
    },
    {
      sequelize,
      modelName: "TestResults",
    }
  );

  return TestResults;
};
