const Task = require("../models/Task");
const User = require("../models/User");
module.exports = {
  async store(req, res) {
    const { task, user_id } = req.body;
    const user = await User.findByPk(user_id);
    if (!user) {
      return res.status(400).json({ error: "Usuario não encontrado" });
    }
    const createdTask = await Task.create({ task, user_id });
    if (!createdTask) {
      return res.status(401).json({ error: "Erro ao criar task" });
    }
    return res.json({ createdTask });
  },
};
