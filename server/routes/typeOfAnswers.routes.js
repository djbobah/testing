const express = require("express");
const router = express.Router({ mergeParams: true });
const models = require("../models");
//userValidator, UserController.create
const TypeOfAnswers = models.AnswerTypes;
router.get("/", async (req, res) => {
  try {
    const typeOfAnswers = await TypeOfAnswers.findAll(
      { where: { description: "1" } },
      { raw: true }
    );
    res.status(200).send(typeOfAnswers);
  } catch (error) {
    res
      .status(500)
      .json({ message: "На сервере произошла ошибка. Попробуйте позже" });
    // .send(error.message);
  }
});

module.exports = router;
