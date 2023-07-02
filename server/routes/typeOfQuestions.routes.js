const express = require("express");
const router = express.Router({ mergeParams: true });
const models = require("../models");
//userValidator, UserController.create
const TypeOfQuestions = models.QuestionTypes;
router.get("/", async (req, res) => {
  try {
    const typeOfQuestions = await TypeOfQuestions.findAll(
      { where: { description: "1" } },
      { raw: true }
    );
    res.status(200).send(typeOfQuestions);
  } catch (error) {
    res
      .status(500)
      .json({ message: "На сервере произошла ошибка. Попробуйте позже" });
    // .send(error.message);
  }
});

module.exports = router;
