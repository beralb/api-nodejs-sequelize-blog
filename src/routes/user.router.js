const express = require('express');

const userController = require('../controllers/user.controller');

const { validateToken } = require('../middlewares/auth.middleware');

const { validateUserBody } = require('../middlewares/validate.middleware');

const router = express.Router();

router.post('/', validateUserBody, userController.createUser);
router.get('/', validateToken, userController.usersGetAll);
router.get('/:id', validateToken, userController.userGetById);
router.delete('/me', validateToken, userController.userDelete);

module.exports = router;
