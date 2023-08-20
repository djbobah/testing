const express = require("express");
const router = express.Router({ mergeParams: true });
const models = require("../models/");
//userValidator, UserController.create
const Departments = models.Departments;
router.get("/", async (req, res) => {
  try {
    const departments = await Departments.findAll({ raw: true });
    res.status(200).send(departments);
  } catch (error) {
    res
      .status(500)
      .json({ message: "На сервере произошла ошибка. Попробуйте позже" });
    // .send(error.message);
  }
});
//получаем список всех пользователей
router.get("/:depId", async (req, res) => {
  // router.get("/", async (req, res) => {

  try {
    const { depId } = req.params;
    // console.log("userId", userId);
    const list = await Departments.findOne({ where: { id: depId } });
    res.status(200).send(list);
  } catch (error) {
    res
      .status(500)
      .json({ message: "На сервере произошла ошибка. Попробуйте позже" });
  }
});

module.exports = router;
