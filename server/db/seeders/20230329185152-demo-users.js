"use strict";

const {
  createPasswordHashSync,
} = require("../../services/helpers/user-model-helpers");

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    return queryInterface.bulkInsert("Users", [
      {
        login: "user1",
        password: createPasswordHashSync("user1password"),
        email: "user1@mail.ru",
        profile: `{"facebook":"facebook1","aboutMe":"aboutMe1"}`,
      },
      {
        login: "user2",
        password: createPasswordHashSync("user2password"),
        email: "user2@mail.ru",
        profile: `{"facebook":"facebook2","aboutMe":"aboutMe2"}`,
      },
      {
        login: "user3",
        password: createPasswordHashSync("user3password"),
        email: "user3@mail.ru",
        profile: `{"facebook":"facebook3","aboutMe":"aboutMe3"}`,
      },
    ]);
  },

  async down(queryInterface, Sequelize) {
    return queryInterface.bulkDelete("Users", null, {});
  },
};
