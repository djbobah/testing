const express = require("express");
const router = express.Router({ mergeParams: true });
// const { userValidator, loginValidator } = require("../services/validators");
const model = require("../models");
const { check, validationResult } = require("express-validator");
const bcrypt = require("bcryptjs");
const tokenService = require("../services/token.service");
//userValidator, UserController.create
const Users = model.Users;

const signUpValidations = [
  check("email", "Некорректный email").isEmail(),
  check("password", "Минимальная длина пароля 6 символов").isLength({ min: 6 }),
];
router.post("/signUp", [
  check("email", "Некорректный email").isEmail(),
  check("password", "Минимальная длина пароля 6 символов").isLength({ min: 6 }),
  async (req, res) => {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res
          .status(400)
          .json({ error: { message: "INVALID_DATA", code: 400 } });
      }
      const { email, password } = req.body;
      console.log("req.body", req.body);
      const existingUser = await Users.findOne({ where: { email: email } });
      // пользователь найден
      if (existingUser) {
        // так же как в модуле про firebase
        return res
          .status(400)
          .json({ error: { message: "EMAIL_EXISTS", code: 400 } });
      }

      // пользователь не найден
      const hashedPassword = await bcrypt.hash(password, 12);
      const newUser = await Users.create({
        ...req.body,
        password: hashedPassword,
      });

      const tokens = tokenService.generate({
        id: newUser.id,
        userId: newUser.id,
      });
      await tokenService.save(newUser.id, tokens.refreshToken);
      res.status(201).send({ ...tokens, userId: newUser.id });
    } catch (error) {
      res
        .status(500)
        .json({ message: "На сервере произошла ошибка. Попробуйте позже" });
    }
  },
]);
// app.post("/api/signUp", userValidator, UserController.creat
router.post("/token", async (req, res) => {});

module.exports = router;
