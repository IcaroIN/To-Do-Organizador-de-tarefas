const SQLite = require("sqlite3");
const path = require("path");

module.exports = {
  username: null,
  password: null,
  database: "todoDB",
  dialect: "sqlite",
  storage: path.resolve(__dirname, "..", "..", "todoDB.sqlite"),
  define: {
    timestamps: true,
    underscored: true,
  },
  dialectOptions: { mode: SQLite.OPEN_READWRITE },
};
