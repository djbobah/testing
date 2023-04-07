const express = require("express");
const router = express.Router({ mergeParams: true });
const { userValidator, loginValidator } = require("../services/validators");
//userValidator, UserController.create
router.post("/signUp", async (req, res) => {});
// app.post("/api/signUp", userValidator, UserController.create);
router.post("/signInWithPassword", async (req, res) => {});
router.post("/token", async (req, res) => {});

module.exports = router;
