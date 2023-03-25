const express = require("express");
const config = require("config");
const chalk = require("chalk");
const { body, validationResult } = require("express-validator");
const bodyParser = require("body-parser");
const { userValidator } = require("./services/validators");
const UserController = require("./controllers/users-controller");

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

app.post("/api/signUp", userValidator, UserController.create);

async function start() {
  try {
    app.listen(PORT, () =>
      console.log(chalk.green(`Server has been started on port ${PORT}...`))
    );
  } catch (error) {}
}

start();
