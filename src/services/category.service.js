const { Category } = require('../models');

const createCategory = async ({ name }) =>
  Category.create({ name });

const categGetAll = async () => {
  const category = await Category.findAll();

  return category;
};

module.exports = {
  createCategory,
  categGetAll,
};
