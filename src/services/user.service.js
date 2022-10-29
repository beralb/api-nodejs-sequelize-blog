// const { User, BlogPost } = require('../models');
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

// const getUserIdByEmail = async (email) => User.findAll({
//   where: { email }, 
//   attributes: { include: ['id'] },
// });

const getUserIdByEmail = (email) => User.findOne({ where: { email } });

module.exports = {
  createUser,
  usersGetAll,
  userGetById,
  getUserIdByEmail,
};
