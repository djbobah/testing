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

module.exports = router;
