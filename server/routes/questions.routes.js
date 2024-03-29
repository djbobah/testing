const express = require("express");
const bcrypt = require("bcryptjs");
const model = require("../models");
const auth = require("../middleware/auth.middleware");
const router = express.Router({ mergeParams: true });

const Questions = model.Questions;
// const { userValidator, loginValidator } = require("../services/validators");
//userValidator, UserController.create

//router.patch("/:userId", auth, async (req, res) => {
router.patch("/:questionId", async (req, res) => {
  try {
    const { questionId } = req.params;
    console.log("questionId", questionId);
    console.log("req.body", req.body);

    const updatedQuestion = await Questions.update(
      {
        question: req.body.question,
        typeOfAnswers: req.body.typeOfAnswers,
      },
      { where: { id: questionId } }
    );
    // console.log("updatedQuestion", updatedQuestion);

    res.send({
      questionId: questionId,
      question: req.body.question,
      typeOfAnswers: req.body.typeOfAnswers,
    });
  } catch (error) {
    res.status(500).json({
      message: "На сервере произошла ошибка update question. Попробуйте позже",
    });
  }
});

//получаем список всех пользователей
router.get("/", auth, async (req, res) => {
  // router.get("/", async (req, res) => {
  try {
    const list = await Questions.findAll();
    res.status(200).send(list);
  } catch (error) {
    res
      .status(500)
      .json({ message: "На сервере произошла ошибка. Попробуйте позже" });
  }
});

//получаем список всех пользователей
router.get("/edit/:questionId", async (req, res) => {
  // router.get("/", async (req, res) => {

  try {
    const { questionId } = req.params;
    // console.log("userId", userId);
    const list = await Questions.findOne({ where: { id: questionId } });
    res.status(200).send(list);
  } catch (error) {
    res
      .status(500)
      .json({ message: "На сервере произошла ошибка. Попробуйте позже" });
  }
});
//получаем список всех вопросов теста
router.get("/:testId", async (req, res) => {
  // router.get("/", async (req, res) => {

  try {
    const { testId } = req.params;
    // console.log("userId", userId);
    const list = await Questions.findAll({ where: { idTest: testId } });
    res.status(200).send(list);
  } catch (error) {
    res
      .status(500)
      .json({ message: "На сервере произошла ошибка. Попробуйте позже" });
  }
});
router.post("/create", [
  // check("email", "Некорректный email").isEmail(),
  // check("password", "Минимальная длина пароля 6 символов").isLength({ min: 6 }),
  async (req, res) => {
    console.log("qqqqqqqqqqq", req.body);
    try {
      const newQuestion = await Questions.create({
        ...req.body,
      });
      console.log("newQuestion ", newQuestion);

      res.status(201).send(newQuestion);
    } catch (error) {
      res.status(500).json({
        message: "На сервере произошла ошибка questions. Попробуйте позже",
      });
    }
  },
]);
router.delete("/:questionId", [
  async (req, res) => {
    const { questionId } = req.params;
    try {
      await Questions.destroy({ where: { id: questionId } });
    } catch (error) {}
  },
]);

module.exports = router;
