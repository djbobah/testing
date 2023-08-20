const express = require("express");
const router = express.Router({ mergeParams: true });
const model = require("../models");
const { check, validationResult } = require("express-validator");
const Tests = model.Tests;

//получаем список всех тестов
router.get("/", async (req, res) => {
  // router.get("/", async (req, res) => {
  try {
    const list = await Tests.findAll();
    res.status(200).send(list);
  } catch (error) {
    res
      .status(500)
      .json({ message: "На сервере произошла ошибка. Попробуйте позже" });
  }
});
//получаем список теста по id
router.get("/:testId", async (req, res) => {
  // router.get("/", async (req, res) => {

  try {
    const { testId } = req.params;
    // console.log("userId", userId);
    const list = await Tests.findOne({ where: { id: testId } });
    res.status(200).send(list);
  } catch (error) {
    res
      .status(500)
      .json({ message: "На сервере произошла ошибка. Попробуйте позже" });
  }
});
router.post("/create", [
  async (req, res) => {
    try {
      const newTest = await Tests.create({
        ...req.body,
      });
      console.log("newTest ", newTest);

      res.status(201).send({ newTest });
    } catch (error) {
      res
        .status(500)
        .json({ message: "На сервере произошла ошибка. Попробуйте позже" });
    }
  },
  router.patch("/:testId", async (req, res) => {
    try {
      const { testId } = req.params;
      console.log("testId ", testId);
      console.log("req ", req.body);

      const updatedTest = await Tests.update(
        {
          ...req.body,
        },
        { where: { id: testId } }
      );
      // console.log("updatedTest", updatedTest);

      res.send({
        ...req.body,
      });
    } catch (error) {
      res.status(500).json({
        message: "На сервере произошла ошибка update test. Попробуйте позже",
      });
    }
  }),
]);

module.exports = router;
