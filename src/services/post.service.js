const { BlogPost } = require('../models');

const createPost = async ({ title, content, published, updated, categoryIds }) =>
  categoryIds.forEach((postId) => {
    BlogPost.create(title, content, published, updated, postId);
  });

module.exports = {
  createPost,
};