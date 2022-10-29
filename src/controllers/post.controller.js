const postService = require('../services/post.service');

const categoryService = require('../services/category.service');

const userService = require('../services/user.service');

const createPost = async (req, res) => {
    const { categoryIds } = req.body;
    const categoriesInDB = await categoryService.getCategoryIds();
    const catNewMap = categoriesInDB.map((eachCat) => eachCat.dataValues.id);

    const existingIds = categoryIds.filter((eachCatId) => catNewMap.includes(eachCatId));

    if (categoryIds.length !== existingIds.length) {
        return res.status(409).json({ message: 'Category already registered' });
    }
    // console.log(req.user);

    const { data } = req.user;

    const email = data;

    // console.log(email);

    const { dataValues } = await userService.getUserIdByEmail(email);
    const userId = dataValues.id;
    // console.log(dataValues);

    const newCategoryData = await postService.createPost(req.body, userId);
    // console.log(req.body);
    return res.status(201).json(newCategoryData);
};

module.exports = {
    createPost,
};
