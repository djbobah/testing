const express = require("express");
const config = require("config");
const chalk = require("chalk");
const { body, validationResult } = require("express-validator");
const bodyParser = require("body-parser");

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
//  app.use(bodyParser.json())

const PORT = config.get("port") ?? 8080;

// if (process.env.NODE_ENV === "production") {
//   console.log("Production");
// } else {
//   console.log("Development");
// }

app.post(
  "/api/signUp",
  [
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
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(422).json({ errors: errors.array() });
    }
    res.send(req.body);
  }
);

async function start() {
  try {
    app.listen(PORT, () =>
      console.log(chalk.green(`Server has been started on port ${PORT}...`))
    );
  } catch (error) {}
}

start();
