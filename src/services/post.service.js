const { BlogPost } = require('../models');

// const createPost = async ({ title, published, updated, content, categoryIds }) =>
//   categoryIds.forEach((postId) => {
//     BlogPost.create({
//       title,
//       published, 
//       updated,
//       content, 
//       postId,
//     });
//   });

const createPost = async ({ title, content, categoryIds, userId }) =>
  BlogPost.create({
    title,
    content,
    categoryIds,
    userId,
  });

module.exports = {
  createPost,
};