const express = require("express");
const router = express.Router();
const UserController = require("./controllers/UserController");
router.get("/user", function (req, res) {
  res.send("Alguma mensagem");
});

router.post("/register", UserController.store);

module.exports = router;
