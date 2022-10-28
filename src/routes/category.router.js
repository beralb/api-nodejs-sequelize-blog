const express = require('express');

const categoryController = require('../controllers/category.controller');

const { validateCategoryBody, validateToken } = require('../middlewares/auth.middleware');

const router = express.Router();

router.post('/', validateCategoryBody, categoryController.createCategory);
router.get('/', validateToken, categoryController.categGetAll);

module.exports = router;