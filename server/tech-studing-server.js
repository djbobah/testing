const express = require("express");
const config = require("config");
const chalk = require("chalk");
const { body, validationResult } = require("express-validator");
const bodyParser = require("body-parser");
const { userValidator, loginValidator } = require("./services/validators");
const UserController = require("./controllers/users-controller");
const { verifyToken } = require("./services/auth/authService");
const initDatabase = require("./services/startUp/initDatabase");
const routes = require("./routes");

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
//  app.use(bodyParser.json())

app.use("./api", routes);

const PORT = config.get("port") ?? 8080;

// if (process.env.NODE_ENV === "production") {
//   console.log("Production");
// } else {
//   console.log("Development");
// }

app.use("/api/*", verifyToken);

app.post("/api/signUp", userValidator, UserController.create);
app.post("/api/login", loginValidator, UserController.login);

async function start() {
  try {
    initDatabase();
    app.listen(PORT, () =>
      console.log(chalk.green(`Server has been started on port ${PORT}...`))
    );
  } catch (error) {}
}

start();
