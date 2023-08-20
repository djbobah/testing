"use strict";

const { QuestionTypes, Answers, Questions } = require("../../models");
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    return queryInterface
      .addColumn("Questions", "typeOfAnswers", {
        type: Sequelize.DataTypes.INTEGER,
        references: { model: { tableName: "AnswerTypes" }, key: "id" },
        allowNull: false,
      })
      .then(() => {
        queryInterface.addColumn("Answers", "idQuestion", {
          type: Sequelize.INTEGER,
          references: { model: { tableName: "Questions" }, key: "id" },
          allowNull: false,
        });
      })
      .then(() => {
        queryInterface.addColumn("Questions", "idTest", {
          type: Sequelize.INTEGER,
          references: { model: { tableName: "Tests" }, key: "id" },
          allowNull: false,
        });
      });
    /**
     * Add altering commands here.
     *
     * Example:
     * await queryInterface.createTable('users', { id: Sequelize.INTEGER });
     */
  },

  async down(queryInterface, Sequelize) {
    return queryInterface
      .removeColumn("Questions", "typeOfAnswers")
      .then(() => {
        queryInterface.removeColumn("Questions", "idTest");
      })
      .then(() => {
        queryInterface.removeColumn("Answers", "idQuestion");
      });
    /**
     * Add reverting commands here.
     *
     * Example:
     * await queryInterface.dropTable('users');
     */
  },
};
