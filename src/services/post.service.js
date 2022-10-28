const { BlogPost } = require('../models');
const { Category } = require('../models');

const createPost = async ({ title, content, published, updated, categoryIds }) =>
    categoryIds.forEach((postId) => {
        BlogPost.create(title, content, published, updated, postId);
    });

const postGetAll = async () => {
    const cat = await Category.findAll({ attributes: ['id'] });
    return cat;
};

module.exports = {
    createPost,
    postGetAll,
};