const postService = require('../services/post.service');

const categoryService = require('../services/category.service');

const userService = require('../services/user.service');

const createPost = async (req, res) => {
  const { categoryIds } = req.body;

  const categoriesInDB = await categoryService.getCategoryIds();
  const catNewMap = categoriesInDB.map((eachCat) => eachCat.dataValues.id);

  const existingIds = categoryIds.filter((eachCatId) => catNewMap.includes(eachCatId));

  if (categoryIds.length !== existingIds.length) {
    return res.status(400).json({ message: 'one or more "categoryIds" not found' });
  }

  const { data: email } = req.user;

  const { dataValues } = await userService.getUserIdByEmail(email);
  const userId = dataValues.id;

  const normalizedDate = new Date(Date.now()).toISOString();

  const newCategoryData = await postService
    .createPost({ userId, updated: normalizedDate, published: normalizedDate, ...req.body });

  return res.status(201).json(newCategoryData);
};

const getAllPosts = async (req, res) => {
  const posts = await postService.getAllPosts();
  console.log(req.user);

  return res.status(200).json(posts);
};

const getPostsById = async (req, res) => {
  const { id } = req.params;

  const posts = await postService.getPostsById(id);
  if (!posts) {
    res.status(404).json({ message: 'Post does not exist' });
  }

  res.status(200).json(posts);
};

module.exports = {
  createPost,
  getAllPosts,
  getPostsById,
};
