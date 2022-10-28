const userService = require('../services/user.service');

const { createToken } = require('../utils/jwt.util');

const { User } = require('../models');

const createUser = async (req, res) => {
  const { email } = req.body;

  const user = await User.findOne({ where: { email } });

  if (user !== null) {
    return res.status(409).json({ message: 'User already registered' });
  }

  const newUserData = await userService.createUser(req.body);

  const { password: _, ...userWithoutPassword } = newUserData;

  const token = createToken(userWithoutPassword);

  return res.status(201).json({ token });
};

const usersGetAll = async (_req, res) => {
  try {
    const users = await userService.usersGetAll();
    return res.status(200).json(users);
  } catch (e) {
    console.log(e.message);
    res.status(500).json({ message: 'Ocorreu um erro' });
  }
};
module.exports = {
  createUser,
  usersGetAll,
};
