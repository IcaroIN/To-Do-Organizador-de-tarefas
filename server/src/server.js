const express = require("express");
const app = express();
const cors = require("cors");
const router = require("./routes");
require("./database");
app.use(express.json());
app.use(cors());
app.use(express.urlencoded({ extended: false }));
app.use("/", router);
app.listen(8888, function () {
  console.log("Servidor OnFire");
});
