const express = require("express");

const model = require("../models");
const auth = require("../middleware/auth.middleware");
const router = express.Router({ mergeParams: true });

const Users = model.Users;
// const { userValidator, loginValidator } = require("../services/validators");
//userValidator, UserController.create
router.patch("/:userId", auth, async (req, res) => {
  try {
    const { userId } = req.params;
    // console.log("userId", userId);
    // проверка что userId =id текущего пользователя
    if (userId === req.user.id) {
      // обновляемые поля берем из req.body
      const updatedUser = await Users.update(
        {
          password: req.body.password,
          email: req.body.email,
          fio: req.body.fio,
        },
        { where: { id: userId } }
      );
      // res.status(200).send()=res.send()
      res.send(updatedUser);
    } else {
      res.status(401).json({ message: "Unauthorized" });
    }
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

module.exports = router;
