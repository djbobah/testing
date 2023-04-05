const { validationResult } = require("express-validator");

const { Users } = require("../models");
const bcryptjs = require("bcryptjs");
const validateDecorator = require("../services/validateDecorator");
const { createToken } = require("../services/auth/authService");

function create(req, res, next) {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(422).json({ errors: errors.array() });
  }
  // res.send(req.body);
  Users.findOne({ where: { email: req.body.email } })
    .then((user) => {
      if (user) {
        return Promise.reject({
          statusCode: 422,
          message: "Пользователь с таким email уже зарегистрирован",
        });
      } else {
        const { login, email, password, profile } = req.body;
        console.log("profile", profile);
        const salt = bcryptjs.genSaltSync(10);
        const passwordHash = bcryptjs.hashSync(password, salt);
        Users.create({ login, email, password: passwordHash });
      }
    })
    .then((Users) => {
      res.json(Users);
    })
    .catch((error) => {
      res.status(error.statusCode || 400).json({ error: error.message });
    });
}

function login(req, res, next) {
  const loginUser = req.body;
  Users.login(loginUser)
    .then(createToken)
    .then((token) => {
      res.json({ token });
      next();
    })
    .catch((error) => {
      res.status(401).json({ error });
    });
}

module.exports = validateDecorator({ create, login });
