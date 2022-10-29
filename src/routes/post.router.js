const express = require('express');

const postController = require('../controllers/post.controller');

// const { validateToken, validatePostBody } = require('../middlewares/auth.middleware');
const { validatePostBody } = require('../middlewares/auth.middleware');

const router = express.Router();

// router.post('/', validateToken, validatePostBody, postController.createPost);
router.post('/', validatePostBody, postController.createPost);
router.get('/', postController.getAllPosts);

module.exports = router;