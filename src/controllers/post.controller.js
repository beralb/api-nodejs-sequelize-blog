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

const getPostById = async (req, res) => {
  const { id } = req.params;

  const post = await postService.getPostById(id);
  if (!post) {
    res.status(404).json({ message: 'Post does not exist' });
  }

  res.status(200).json(post);
};

const updatePost = async (req, res) => {
  const { id } = req.params;
  const { data: email } = req.user;
  const { dataValues } = await userService.getUserIdByEmail(email);
  const userId = dataValues.id;

  const postObject = await postService.getPostById(id);
  const postUserId = postObject.dataValues.userId;

  if (userId !== postUserId) {
    return res.status(401).json({ message: 'Unauthorized user' });
  }

  const isUpdated = await postService.updatePost(id, req.body);

  if (isUpdated) {
    const updatedPost = await postService.getPostById(id);
    return res.status(200).json(updatedPost);
  }

  return res.status(404).json({ message: `Post ${id} não encontrado` });
};

const deletePost = async (req, res) => {
  const { id } = req.params;
  const { data: email } = req.user;
  const { dataValues } = await userService.getUserIdByEmail(email);
  const loggedUserId = dataValues.id;

  const relatedPostById = await postService.getPostById(id);

  if (!relatedPostById) {
    return res.status(404).json({ message: 'Post does not exist' });
  }

  const postIdUserId = relatedPostById.dataValues.userId;

  if (loggedUserId === postIdUserId) {
    await postService.deletePost(id);
    return res.status(204).json({ message: 'Post removido com sucesso' });
  }

  return res.status(401).json({ message: 'Unauthorized user' });
};

const searchPost = async (req, res) => {
  const { q: query } = req.query;
  const searchResult = await postService.searchPost(query);

  if (!searchResult) {
      return res.status(404).json({ message: 'Post does not exist' });
  }

  res.status(200).json(searchResult);
};

module.exports = {
  createPost,
  getAllPosts,
  getPostById,
  updatePost,
  deletePost,
  searchPost,
};

  // const loggedUserEmail = req.session.username;
  // console.log(req.session.username);