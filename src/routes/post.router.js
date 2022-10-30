const express = require('express');

const postController = require('../controllers/post.controller');

const { validatePostBody, validateUpdatePostBody } = require('../middlewares/validate.middleware');

const router = express.Router();

router.get('/search', postController.searchPost);
router.post('/', validatePostBody, postController.createPost);
router.get('/', postController.getAllPosts);
router.get('/:id', postController.getPostById);
router.put('/:id', validateUpdatePostBody, postController.updatePost);
router.delete('/:id', postController.deletePost);

module.exports = router;