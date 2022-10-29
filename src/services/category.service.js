const { Category } = require('../models');

const createCategory = async ({ name }) =>
  Category.create({ name });

const categGetAll = async () => {
  const category = await Category.findAll();

  return category;
};

const getCategoryIds = async () => {
  const cat = await Category.findAll({ attributes: ['id'] });
  return cat;
};

module.exports = {
  createCategory,
  categGetAll,
  getCategoryIds,
};
