const express = require('express');

const categoryController = require('../controllers/category.controller');

const { validateToken } = require('../middlewares/auth.middleware');

const { validateCategoryBody } = require('../middlewares/validate.middleware');

const router = express.Router();

router.post('/', validateCategoryBody, categoryController.createCategory);
router.get('/', validateToken, categoryController.categGetAll);

module.exports = router;