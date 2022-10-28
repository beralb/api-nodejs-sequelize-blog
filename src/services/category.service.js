const { Category } = require('../models');

const createCategory = async ({ name }) =>
  Category.create({ name });

const cateforyGetAll = async () => {
  const users = await Category.findAll({
  });

  return users;
};

module.exports = {
  createCategory,
  cateforyGetAll,
};
