const express = require("express");
const router = express.Router({ mergeParams: true });
// const { userValidator, loginValidator } = require("../services/validators");
const model = require("../models");
const { check, validationResult } = require("express-validator");
const bcrypt = require("bcryptjs");
const tokenService = require("../services/token.service");
//userValidator, UserController.create
const Users = model.Users;
// const Tokens = model.Tokens;

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
        return res.status(400).json({
          error: {
            message: "INVALID_DATA",
            code: 400,
            // выводит подробную информацию в каком араметре какая ошибка
            errors: errors.array(),
          },
        });
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
      console.log("existingUser ", existingUser);
      // пользователь не найден
      const hashedPassword = await bcrypt.hash(password, 12);
      const newUser = await Users.create({
        ...req.body,
        password: hashedPassword,
      });
      console.log("newUser ", newUser);
      const tokens = tokenService.generate({
        id: newUser.id,
        userId: newUser.id,
      });
      await tokenService.save(newUser.id, tokens.refreshToken);
      res.status(201).send({ ...tokens, userId: newUser.id });
    } catch (error) {
      res
        .status(500)
        .json({ message: "На сервере произошла ошибка111. Попробуйте позже" });
    }
  },
]);

router.post("/signInWithPassword", [
  check("email", "Email некорректен").normalizeEmail().isEmail(),
  check("password", "Пароль не может быть пустым").exists(),
  async (req, res) => {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({
          error: {
            message: "INVALID_DATA",
            code: 400,
            // выводит подробную информацию в каком араметре какая ошибка
            // errors: errors.array(),
          },
        });
      }
      const { email, password } = req.body;
      const existingUser = await Users.findOne({ where: { email: email } });
      // пользователь не найден
      if (!existingUser) {
        // так же как в модуле про firebase
        return res
          .status(400)
          .json({ error: { message: "EMAIL_NOT_FOUND", code: 400 } });
      }
      // пользователь  найден
      const isPasswordEqual = await bcrypt.compare(
        password,
        existingUser.password
      );
      if (!isPasswordEqual) {
        return res
          .status(400)
          .json({ error: { message: "INVALID_PASSWORD", code: 400 } });
      }
      const tokens = tokenService.generate({ id: existingUser.id });
      await tokenService.save(existingUser.id, tokens.refreshToken);
      res.status(201).send({ ...tokens, ...existingUser.dataValues });
    } catch (error) {
      res
        .status(500)
        .json({ message: "На сервере произошла ошибка. Попробуйте позже" });
    }
  },
]);
// app.post("/api/signUp", userValidator, UserController.creat

function isTokenInvalid(data, dbToken) {
  return !data || !dbToken || data.id !== dbToken?.userId;
}
router.post("/token", async (req, res) => {
  const { refreshToken } = req.body;
  const data = tokenService.validateRefresh(refreshToken);
  // console.log("refreshToken", refreshToken);

  const dbToken = await tokenService.findToken(refreshToken);
  // console.log("data", data);
  // console.log("dbToken", dbToken);
  if (isTokenInvalid(data, dbToken)) {
    res.status(401).json({ message: "Unauthtorized" });

    const tokens = await tokenService.generate({ id: dbToken.userId });
    await tokenService.save(data.id, tokens.refreshToken);
    res.status(200).send({ ...tokens, userId: data.id });
  }

  // console.log(data);
  //  const tokens = await tokenService.generate({ id: dbToken.userId });
  //  await tokenService.save(data.id, tokens.refreshToken);
  //  res.status(200).send({ ...tokens, userId: data.id });

  try {
  } catch (error) {
    res
      .status(500)
      .json({ message: "На сервере произошла ошибка. Попробуйте позже" });
  }
});

module.exports = router;
