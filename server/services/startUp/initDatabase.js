const departmentsMock = require("../../mock/departments.json");
const { Users, Departments } = require("../../models");
const UserController = require("../../controllers/users-controller");

module.exports = async () => {
  const departments = await Departments.findAll();
  if (departments.length !== departmentsMock.length) {
    // console.log("not identy");
    await createInitialEntity(Departments, departmentsMock);
  }
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
  // Model.collection.drop();
  await Model.destroy({
    truncate: true,
  });
  return Promise.all(
    data.map(async (item) => {
      try {
        // delete item.id;
        const newItem = new Model(item);
        console.log(newItem);
        await newItem.save();
        return newItem;
      } catch (error) {
        return error;
      }
    })
  );
}
