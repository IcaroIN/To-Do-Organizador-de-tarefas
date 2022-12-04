const { Sequelize } = require("sequelize");
const configDb = require("../config/database");
const User = require("../models/User");
const connection = new Sequelize(configDb);

async function testConnection() {
  try {
    await connection.authenticate();
    console.log("Connection has been established successfully.");
  } catch (error) {
    console.log(`Unable to connect to the database: ${error}`);
  }
}
testConnection();

User.init(connection);
module.exports = connection;
