const { body, validationResult } = require("express-validator");

const validators = {
  userValidator: [
    body("email").trim().isEmail().normalizeEmail(),
    body("password")
      .not()
      .isEmpty()
      .trim()
      .isLength({ min: 5 })
      .withMessage("Длина пароля не может быть меньше 5 символов")
      .matches(/\d/)
      .withMessage("Пароль должен содержать хотябы 1 цифру"),
  ],
  loginValidator: [
    body("email").trim().isEmail().normalizeEmail(),
    body("password")
      .not()
      .isEmpty()
      .trim()
      .isLength({ min: 5 })
      .withMessage("Длина пароля не может быть меньше 5 символов")
      .matches(/\d/)
      .withMessage("Пароль должен содержать хотябы 1 цифру"),
  ],
};

module.exports = validators;
