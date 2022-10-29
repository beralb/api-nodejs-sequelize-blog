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

// const getAllPosts = async () => {
//   const posts = await BlogPost.findAll({

//     include: [
//       { model: User, as: 'users' },
//       { model: Category, as: 'categories' },
//     ],
//     // exclude: [
//     //   { model: PostCategory, as: 'posts_categories' },
//     // ],
//   });
// };

const getAllPosts = async () => BlogPost.findAll({
  attributes: { exclude: ['user_id'] },
  include: [
    { model: User, as: 'user', attributes: { exclude: ['password'] } },
    // { model: Category, as: 'categories', attributes: ['name', 'duration'], through: { attributes: [] } },
    { model: Category, as: 'categories', through: { attributes: [] } },
    // { model: BlogPost, as: 'blogposts', attributes: { exclude: ['user_id'] } },
  ],
});

module.exports = {
  createPost,
  getAllPosts,
};