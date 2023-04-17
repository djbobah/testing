const express = require("express");
const router = express.Router({ mergeParams: true });

router.use("/auth", require("./auth.routes"));
router.use("/users", require("./user.routes"));
router.use("/departments", require("./departments.routes"));

module.exports = router;
