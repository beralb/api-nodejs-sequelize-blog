const express = require('express');

const userController = require('../controllers/user.controller');
const { validateToken, validateUserBody } = require('../middlewares/auth.middleware');

const router = express.Router();

router.post('/', validateUserBody, userController.createUser);
router.get('/', validateToken, userController.usersGetAll);
router.get('/:id', validateToken, userController.userGetById);

module.exports = router;
