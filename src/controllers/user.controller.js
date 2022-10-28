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

const userGetById = async (req, res) => {
  const { id } = req.params;
  const [user] = await userService.userGetById(id);

  if (!user) {
    res.status(404).json({ message: 'User does not exist' });
  }

  res.status(200).json(user);
};

module.exports = {
  createUser,
  usersGetAll,
  userGetById,
};
