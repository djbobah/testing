const express = require("express");
const model = require("../models");

const router = express.Router({ mergeParams: true });

const TestResults = model.TestResults;

router.post("/create", [
  async (req, res) => {
    console.log("qqqqqqqqqqq", req.body);
    try {
      const newTestResults = await TestResults.create({
        ...req.body,
      });
      console.log("newQuestion ", newTestResults);
      res.status(201).send(newTestResults);
    } catch (error) {
      res.status(500).json({
        message: "На сервере произошла ошибка userAnswers. Попробуйте позже",
      });
    }
  },
]);

module.exports = router;
