const express = require("express");
const app = express();
const router = require("./routes");
app.use("/", router);
app.listen(8888, function () {
  console.log("Servidor OnFire");
});
