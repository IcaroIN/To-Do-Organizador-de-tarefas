const { Model, DataTypes } = require("sequelize");
class User extends Model {
  static init(sequelize) {
    super.init(
      { user: DataTypes.STRING, password: DataTypes.STRING },
      { sequelize }
    );
  }

  static associate(models) {
    this.hasMany(models.Task, { foreignKey: "user_id", as: "task" });
  }
}
module.exports = User;
