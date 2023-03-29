"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    return queryInterface
      .changeColumn("Users", "CreatedAt", {
        type: Sequelize.DATE,
        allowNull: false,
        defaultValue: Sequelize.literal("CURRENT_TIMESTAMP"),
      })
      .then(() => {
        queryInterface.changeColumn("Users", "UpdatedAt", {
          type: Sequelize.DATE,
          allowNull: false,
          defaultValue: Sequelize.literal("CURRENT_TIMESTAMP"),
        });
      });
  },

  async down(queryInterface, Sequelize) {
    return queryInterface
      .changeColumn("Users", "CreatedAt", {
        type: Sequelize.DATE,
        allowNull: false,
      })
      .then(() => {
        queryInterface.changeColumn("Users", "UpdatedAt", {
          type: Sequelize.DATE,
          allowNull: false,
        });
      });
  },
};
