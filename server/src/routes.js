const express = require("express");
const TaskController = require("./controllers/TaskController");
const router = express.Router();
const UserController = require("./controllers/UserController");
router.get("/user", function (req, res) {
  res.send("Alguma mensagem");
});

router.post("/user/register", UserController.store);

router.post("/user/:user_id/task", TaskController.store);

router.get("/user/:user_id/task", TaskController.index);

router.delete("/user/:user_id/task/:id", TaskController.destroy);

module.exports = router;
