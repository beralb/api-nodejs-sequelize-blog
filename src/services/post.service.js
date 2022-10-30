const { BlogPost, PostCategory, Category, User } = require('../models');

const createPost = async ({ title, content, userId, published, updated, categoryIds }) => {
  const blogPost = await BlogPost.create({
    title,
    content,
    userId,
    published,
    updated,
  });
  categoryIds.forEach((categoryId) => {
    if (!categoryId) {
      return;
    }
    PostCategory.create({
      postId: blogPost.id,
      categoryId,
    });
  });
  return blogPost;
};

const getAllPosts = async () => BlogPost.findAll({
  attributes: { exclude: ['user_id'] },
  include: [
    { model: User, as: 'user', attributes: { exclude: ['password'] } },
    { model: Category, as: 'categories', through: { attributes: [] } },
  ],
});

const getPostById = (id) => BlogPost.findByPk(id, {
  attributes: { exclude: ['user_id'] },
  include: [
    { model: User, as: 'user', attributes: { exclude: ['password'] } },
    { model: Category, as: 'categories', through: { attributes: [] } },
  ],
});

const updatePost = async (id, { title, content }) => BlogPost.update(
  { title, content },
  { where: { id } },
);

module.exports = {
  createPost,
  getAllPosts,
  getPostById,
  updatePost,
};