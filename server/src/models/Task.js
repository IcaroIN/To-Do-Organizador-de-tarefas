const { Model, DataTypes } = require("sequelize");
class Task extends Model {
  static init(sequelize) {
    super.init({ task: DataTypes.STRING }, { sequelize });
  }

  static associate(models) {
    this.belongsTo(models.User, { foreignKey: "user_id", as: "user" });
  }
}
module.exports = Task;
