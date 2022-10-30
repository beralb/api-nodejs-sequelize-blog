const express = require('express');

const postController = require('../controllers/post.controller');

const { validatePostBody } = require('../middlewares/auth.middleware');

const router = express.Router();

router.post('/', validatePostBody, postController.createPost);
router.get('/', postController.getAllPosts);
router.get('/:id', postController.getPostsById);
router.put('/:id', postController.updatePost);

module.exports = router;