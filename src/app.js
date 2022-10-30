const express = require('express');
const session = require('express-session');
require('express-async-errors');
const errorMiddleware = require('./middlewares/error');
const routes = require('./routes/router');

const app = express();

app.use(session({
  secret: process.env.JWT_SECRET,
  resave: true,
  saveUninitialized: true,
}));

app.use(express.json());

app.use(routes);

app.use(errorMiddleware);

module.exports = app;