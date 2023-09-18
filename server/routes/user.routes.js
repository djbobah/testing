const express = require("express");
const bcrypt = require("bcryptjs");
const model = require("../models");
const auth = require("../middleware/auth.middleware");
const router = express.Router({ mergeParams: true });

const Users = model.Users;
// const { userValidator, loginValidator } = require("../services/validators");
//userValidator, UserController.create

//router.patch("/:userId", auth, async (req, res) => {
router.patch("/:userId", async (req, res) => {
  try {
    const { userId } = req.params;
    console.log("userId", userId);
    // console.log("req.user.id", req.user.id);

    // проверка что userId =id текущего пользователя
    //   if (userId === req.user.id) {
    // обновляемые поля берем из req.body
    if (req.body.password === "") {
      const updatedUser = await Users.update(
        {
          //  password: hashedPassword,
          email: req.body.email,
          fio: req.body.fio,
          id_department: req.body.department,
        },
        { where: { id: userId } }
      );
      res.send({
        id: userId,
        // password: hashedPassword,
        email: req.body.email,
        fio: req.body.fio,
        id_department: req.body.department,
      });
    } else {
      const hashedPassword = await bcrypt.hash(req.body.password, 12);

      const updatedUser = await Users.update(
        {
          password: hashedPassword,
          email: req.body.email,
          fio: req.body.fio,
          id_department: req.body.department,
        },
        { where: { id: userId } }
      );
      res.send({
        id: userId,
        password: hashedPassword,
        email: req.body.email,
        fio: req.body.fio,
        id_department: req.body.department,
      });
    }
    // res.status(200).send()=res.send()
    // console.log("updatedUser", updatedUser);

    // } else {
    //   res.status(401).json({ message: "Unauthorized" });
    // }
  } catch (error) {
    res
      .status(500)
      .json({ message: "На сервере произошла ошибка. Попробуйте позже" });
  }
});

//получаем список всех пользователей
// router.get("/", auth, async (req, res) => {
router.get("/", async (req, res) => {
  try {
    const list = await Users.findAll();
    res.status(200).send(list);
  } catch (error) {
    res
      .status(500)
      .json({ message: "На сервере произошла ошибка. Попробуйте позже" });
  }
});

//получаем список всех пользователей
router.get("/:userId", async (req, res) => {
  // router.get("/", async (req, res) => {

  try {
    const { userId } = req.params;
    // console.log("userId", userId);
    const list = await Users.findOne({ where: { id: userId } });
    res.status(200).send(list);
  } catch (error) {
    res
      .status(500)
      .json({ message: "На сервере произошла ошибка. Попробуйте позже" });
  }
});

module.exports = router;
