const express = require('express');

const postController = require('../controllers/post.controller');

const { validateToken, validatePostBody } = require('../middlewares/auth.middleware');

const router = express.Router();

router.post('/', validateToken, validatePostBody, postController.createPost);

module.exports = router;