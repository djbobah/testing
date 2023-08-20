"use strict";

// const { DataTypes } = require("sequelize");
const { Departments } = require("../../models");

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    return queryInterface.addColumn("Users", "id_department", {
      type: Sequelize.DataTypes.INTEGER,
      references: {
        model: {
          tableName: "Departments",
          // schema: "schema",
        },
        key: "id",
      },
      allowNull: false,
      // defaultValue: "user",
    });
  },

  async down(queryInterface, Sequelize) {
    return queryInterface.removeColumn("Users", "id_department");
  },
};
