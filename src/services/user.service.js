const { User } = require('../models');

const createUser = async ({ displayName, email, password, image }) =>
  User.create({ displayName, email, password, image });

const usersGetAll = async () => {
  const users = await User.findAll({
    attributes: { exclude: ['password'] },
  });

  return users;
};

const userGetById = async (id) => User.findAll({
  where: { id },
  attributes: { exclude: ['password'] },
});

const getUserIdByEmail = (email) => User.findOne({ where: { email } });

const userDelete = async (id) => {
  const qtdRemoved = await User.destroy({ where: { id } });

  return qtdRemoved > 0;
};

module.exports = {
  createUser,
  usersGetAll,
  userGetById,
  getUserIdByEmail,
  userDelete,
};
