const Task = require("../models/Task");
const User = require("../models/User");
module.exports = {
  async index(req, res) {
    const { user_id } = req.params;
    const listTask = await Task.findAll({ where: { user_id } });
    return res.json(listTask);
  },
  async store(req, res) {
    const { task } = req.body;
    const { user_id } = req.params;
    const user = await User.findByPk(user_id);
    if (!user) {
      return res.status(400).json({ error: "Usuario não encontrado" });
    }
    const createdTask = await Task.create({ task, user_id });
    if (!createdTask) {
      return res.status(401).json({ error: "Erro ao criar task" });
    }
    return res.json(createdTask);
  },
};
