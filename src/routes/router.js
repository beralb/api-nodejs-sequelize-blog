const express = require('express');

const loginRouter = require('./login.router');

const userRouter = require('./user.router');

const authMiddleware = require('../middlewares/auth.middleware');

const routers = express.Router();

// rotas públicas
routers.use('/login', loginRouter);
routers.use('/user', userRouter);

routers.use(authMiddleware.validateToken);

// a partir daqui rotas privadas - precisar ter feito autenticação (token)

module.exports = routers;