const Joi = require('joi');

const jwt = require('jsonwebtoken');

const { JWT_SECRET } = process.env;

const validateUserBody = (req, res, next) => {
  const params = req.body;
  const schema = Joi.object({
    displayName: Joi.string().min(8).required(),
    email: Joi.string().email().required(),
    password: Joi.string().min(6).required(),
    image: Joi.string(),
  });

  const { error } = schema.validate(params);

  if (error) {
    const errorMessage = error.details[0].message;
    return res.status(400).json({ message: errorMessage });
  }

  next();
};

const validateToken = async (req, res, next) => {
  const { authorization } = req.headers;
  if (!authorization) {
    return res.status(401).json({ message: 'Token not found' });
  }
  try {
    const payload = jwt.verify(authorization, JWT_SECRET);
    req.user = payload;

    return next();
  } catch (err) {
    return res.status(401).json({ message: 'Expired or invalid token' });
  }
};

const validateCategoryBody = (req, res, next) => {
  const params = req.body;
  const schema = Joi.object({
    name: Joi.string().required(),
  });

  const { error } = schema.validate(params);

  if (error) {
    const errorMessage = error.details[0].message;
    return res.status(400).json({ message: errorMessage });
  }

  next();
};

module.exports = { validateToken, validateUserBody, validateCategoryBody };
