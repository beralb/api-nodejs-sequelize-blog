const postService = require('../services/post.service');

const createPost = async (req, res) => {
    const { categoryIds } = req.body;
    const categoriesInDB = await postService.postGetAll();
    const catNewMap = categoriesInDB.map((eachCat) => eachCat.dataValues.id);

    const existingIds = categoryIds.filter((eachCatId) => catNewMap.includes(eachCatId));

    if (categoryIds.length !== existingIds.length) {
        return res.status(409).json({ message: 'Category already registered' });
    }
    const newCategoryData = await postService.createPost(req.body);
    console.log(req.body);
    return res.status(201).json(newCategoryData);
};

module.exports = {
    createPost,
};
