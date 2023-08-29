const express = require("express");
const bcrypt = require("bcryptjs");
const model = require("../models");
const auth = require("../middleware/auth.middleware");
const router = express.Router({ mergeParams: true });

const Answers = model.Answers;
// const { userValidator, loginValidator } = require("../services/validators");
//userValidator, UserController.create

//router.patch("/:userId", auth, async (req, res) => {
router.patch("/:answerId", async (req, res) => {
  try {
    const { answerId } = req.params;
    console.log("answerId", answerId);
    // console.log("req.user.id", req.user.id);

    // проверка что userId =id текущего пользователя
    //   if (userId === req.user.id) {
    // обновляемые поля берем из req.body
    // if (req.body.password === "") {
    //   const updatedUser = await Users.update(
    //     {
    //       //  password: hashedPassword,
    //       email: req.body.email,
    //       fio: req.body.fio,
    //       id_department: req.body.department,
    //     },
    //     { where: { id: userId } }
    //   );
    //   res.send(updatedUser);
    // } else {
    //   const hashedPassword = await bcrypt.hash(req.body.password, 12);

    //   const updatedUser = await Users.update(
    //     {
    //       password: hashedPassword,
    //       email: req.body.email,
    //       fio: req.body.fio,
    //       id_department: req.body.department,
    //     },
    //     { where: { id: userId } }
    //   );
    //   res.send(updatedUser);
    // }
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

// //получаем список всех пользователей
// router.get("/", auth, async (req, res) => {
//   // router.get("/", async (req, res) => {
//   try {
//     const list = await Users.findAll();
//     res.status(200).send(list);
//   } catch (error) {
//     res
//       .status(500)
//       .json({ message: "На сервере произошла ошибка. Попробуйте позже" });
//   }
// });

//получаем список всех ответов на вопрос
router.get("/:idTest", async (req, res) => {
  // router.get("/", async (req, res) => {

  try {
    const { idTest } = req.params;
    // console.log("userId", userId);
    const list = await Answers.findAll({ where: { idTest: idTest } });
    res.status(200).send(list);
  } catch (error) {
    res.status(500).json({
      message: "На сервере произошла ошибка answers. Попробуйте позже",
    });
  }
});
router.post("/create", [
  // check("email", "Некорректный email").isEmail(),
  // check("password", "Минимальная длина пароля 6 символов").isLength({ min: 6 }),
  async (req, res) => {
    console.log(req.body);
    try {
      const newAnswer = await Answers.create({
        ...req.body,
      });
      console.log("newAnswer ", newAnswer);

      res.status(201).send(newAnswer);
    } catch (error) {
      res
        .status(500)
        .json({ message: "На сервере произошла ошибка. Попробуйте позже" });
    }
  },
]);
router.delete("/:answerId", [
  async (req, res) => {
    const { answerId } = req.params;
    try {
      await Answers.destroy({ where: { id: answerId } });
    } catch (error) {}
  },
]);

module.exports = router;
