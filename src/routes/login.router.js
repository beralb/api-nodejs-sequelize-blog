const express = require('express');

const session = require('express-session')

const authController = require('../controllers/auth.controller');

const router = express.Router();

router.post('/', authController.loginAuth);

module.exports = router;
