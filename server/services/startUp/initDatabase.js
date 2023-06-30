const departmentsMock = require("../../mock/departments.json");
const QuestionTypes = require("../../mock/questionTypes.json");
const rolesMock = require("../../mock/roles.json");
const { Roles, Departments, QuestionTypes } = require("../../models");
const UserController = require("../../controllers/users-controller");

module.exports = async () => {
  const departments = await Departments.findAll();
  if (departments.length !== departmentsMock.length) {
    // console.log("not identy");
    await createInitialEntity(Departments, departmentsMock);
  }
  const questionTypes = await QuestionTypes.findAll();
  if (questionTypes.length !== questionTypesMock.length) {
    // console.log("not identy");
    await createInitialEntity(QuestionTypes, QuestionTypes);
  }
  // const roles = await Roles.findAll();
  // if (roles.length !== rolesMock.length) {
  //   // console.log("not identy");
  //   await createInitialEntity(Roles, rolesMock);
  // }
  // UserController.create({
  //   login: "aaa",
  //   email: "aaa4@mail.ru",
  //   password: "kddkdk",
  // });
  // Users.create({
  //   login: "aaaa",
  //   email: "aaa@mail.ru",
  //   password: "kddkdk",
  // });
};

async function createInitialEntity(Model, data) {
  // await Model.drop();

  await Model.destroy({ where: {} });
  console.log(`${Model.name} table dropped!`);
  // Model.create({ name: "jhjdfhjdh", comment: "dsfsdfs" });
  return Promise.all(
    data.map(async (item) => {
      try {
        delete item.id;
        // console.log(item);

        const newItem = new Model(item);
        await newItem.save();
        // const newItem = new Model(item);
        // console.log(newItem.dataValues);

        // await Model.create(item);
        return newItem;
      } catch (error) {
        return error;
      }
    })
  );
}
