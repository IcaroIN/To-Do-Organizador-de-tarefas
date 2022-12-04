const { Sequelize } = require("sequelize");
const configDb = require("../config/database");
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
