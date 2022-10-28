const express = require('express');

const userController = require('../controllers/user.controller');
const { validateToken } = require('../middlewares/auth.middleware');
const { validateBody } = require('../services/auth.service');

const router = express.Router();

router.post('/', validateBody, userController.createUser);
router.get('/', validateToken, userController.usersGetAll);

module.exports = router;
