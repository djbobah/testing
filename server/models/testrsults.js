'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class TestRsults extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  TestRsults.init({
    idUser: DataTypes.INTEGER,
    idTest: DataTypes.INTEGER,
    questionsForTest: DataTypes.STRING,
    answersForTest: DataTypes.STRING,
    userAnswers: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'TestRsults',
  });
  return TestRsults;
};