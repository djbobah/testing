"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    /**
     * Add altering commands here.
     *
     * Example:
     * await queryInterface.createTable('users', { id: Sequelize.INTEGER });
     */
    return queryInterface
      .renameColumn("Users", "role", "roles")
      .then(() => {
        queryInterface.changeColumn("Users", "roles", {
          type: Sequelize.JSON,
          // allowNull: false,
          // defaultValue: "[1]",
        });
      })
      .then(() => {
        queryInterface.addColumn("Users", "dateRegistration", {
          type: Sequelize.DATE,
          allowNull: false,
          defaultValue: Sequelize.literal("CURRENT_TIMESTAMP"),
        });
      });
    // .changeColumn("Users", "CreatedAt", {
    //   type: Sequelize.DATE,
    //   allowNull: false,
    //   defaultValue: Sequelize.literal("CURRENT_TIMESTAMP"),
    // })
    // .then(() => {
    // queryInterface.changeColumn("Users", "UpdatedAt", {
    //   type: Sequelize.DATE,
    //   allowNull: false,
    //   defaultValue: Sequelize.literal("CURRENT_TIMESTAMP"),
    // });
    // });
  },

  async down(queryInterface, Sequelize) {
    /**
     * Add reverting commands here.
     *
     * Example:
     * await queryInterface.dropTable('users');
     */
    return queryInterface
      .changeColumn("Users", "roles", {
        type: Sequelize.STRING,
        allowNull: false,
        defaultValue: "user",
      })
      .then(() => {
        queryInterface.removeColumn("Users", "dateRegistration");
      })
      .then(() => {
        queryInterface.renameColumn("Users", "roles", "role");
      });
  },
};
