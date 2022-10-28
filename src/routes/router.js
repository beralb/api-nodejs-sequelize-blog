const express = require('express');

const authMiddleware = require('../middlewares/auth.middleware');

const loginRouter = require('./login.router');

const userRouter = require('./user.router');

const categoryRouter = require('./category.router');

const routers = express.Router();

// rotas públicas
routers.use('/login', loginRouter);
routers.use('/user', userRouter);

routers.use(authMiddleware.validateToken);

// a partir daqui rotas privadas - precisar ter feito autenticação (token)

routers.use('/categories', categoryRouter);

module.exports = routers;