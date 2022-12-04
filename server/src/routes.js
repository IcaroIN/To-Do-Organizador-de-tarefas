const express = require("express");
const router = express.Router();
router.get("/user", function (req, res) {
  res.send("Alguma mensagem");
});
module.exports = router;
