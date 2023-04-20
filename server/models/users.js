"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Users extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Users.init(
    {
      // login: DataTypes.STRING,
      password: DataTypes.STRING,
      email: DataTypes.STRING,
      roles: DataTypes.JSON,
      id_department: DataTypes.INTEGER,
      fio: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "Users",
    }
  );

  Users.login = function (loginUser) {};
  return Users;
};
