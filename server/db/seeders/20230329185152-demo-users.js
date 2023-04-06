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
        fio: "Иванов Иван Иванович",
        email: "user1@mail.ru",
        id_department: 1,
        roles: "[1]",
      },
      {
        login: "user2",
        password: createPasswordHashSync("user2password"),
        fio: "Петров Петр Петрович",
        email: "user2@mail.ru",
        id_department: 2,
        roles: "[1, 2]",
      },
      {
        login: "user3",
        password: createPasswordHashSync("user3password"),
        fio: "Сидоров Сидр Сидорович",
        email: "user3@mail.ru",
        id_department: 3,
        roles: "[1, 2, 3]",
      },
    ]);
  },

  async down(queryInterface, Sequelize) {
    return queryInterface.bulkDelete("Users", null, {});
  },
};
