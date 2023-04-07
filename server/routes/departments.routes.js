const express = require("express");
const router = express.Router({ mergeParams: true });
const Departments = require("../models/departments");
//userValidator, UserController.create
router.get("/", async (req, res) => {
  try {
    const departments = await Departments.find();
    res.status(200).json({ list: departments });
  } catch (error) {
    res
      .status(500)
      .json({ message: "На сервере произошла ошибка. Попробуйте позже" });
  }
});

module.exports = router;
