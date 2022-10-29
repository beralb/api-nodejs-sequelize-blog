const { BlogPost, PostCategory } = require('../models');

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

module.exports = {
  createPost,
};