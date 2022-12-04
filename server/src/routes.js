const express = require("express");
const TaskController = require("./controllers/TaskController");
const router = express.Router();
const UserController = require("./controllers/UserController");
router.get("/user", function (req, res) {
  res.send("Alguma mensagem");
});

router.post("/register", UserController.store);

router.post("/task/register", TaskController.store);

module.exports = router;
