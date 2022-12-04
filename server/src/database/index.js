const { Sequelize } = require("sequelize");
const { username } = require("../config/database");
const configDb = require("../config/database");
const Task = require("../models/Task");
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
Task.init(connection);
User.associate(connection.models);
Task.associate(connection.models);
module.exports = connection;
