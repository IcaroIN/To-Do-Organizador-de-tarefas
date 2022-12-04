const User = require("../models/User");
module.exports = {
  async store(req, res) {
    const { user, password } = req.body;
    const [createdUser, isCreated] = await User.findOrCreate({
      where: { user, password },
    });
    if (!createdUser) {
      return res.status(401).json({ error: "Erro ao criar ou logar" });
    }
    return res.json({ createdUser, isCreated });
  },
};
