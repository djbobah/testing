const express = require("express");
const router = express.Router({ mergeParams: true });

router.use("/auth", require("./auth.routes"));
router.use("/users", require("./user.routes"));
router.use("/departments", require("./departments.routes"));
router.use("/tests", require("./tests.routes"));
router.use("/typeOfAnswers", require("./typeOfAnswers.routes"));
router.use("/questions", require("./questions.routes"));
router.use("/answers", require("./answers.routes"));

module.exports = router;
