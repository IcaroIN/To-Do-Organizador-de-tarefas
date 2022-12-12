const { update } = require("../models/Task");
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

  async destroy(req, res) {
    const { user_id, id } = req.params;
    const task = await Task.findByPk(id);
    if (!task) {
      return res.status(400).json({ error: "Task não existe" });
    }
    if (task.user_id != user_id) {
      return res
        .status(400)
        .json({ error: "usuário não é proprietário da task" });
    }
    await Task.destroy({ where: { id } });

    return res.json();
  },

  async update(req, res) {
    const { taskName } = req.body;
    const { user_id, id } = req.params;
    const task = await Task.findByPk(id);
    if (!task) {
      return res.status(400).json({ error: "Task não existe" });
    }
    if (task.user_id != user_id) {
      return res
        .status(400)
        .json({ error: "usuário não é proprietário da task" });
    }
    await Task.update({ task: taskName }, { where: { id } });
    task.task = taskName;
    return res.json(task);
  },
};
