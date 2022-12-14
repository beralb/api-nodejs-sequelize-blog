const Joi = require('joi');

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

const validatePostBody = (req, res, next) => {
  const params = req.body;
  const schema = Joi.object({
    title: Joi.string().required(),
    content: Joi.string().required(),
    categoryIds: Joi.array().items(Joi.number()).required(),
  });

  const { error } = schema.validate(params);

  if (error) {
    const errorMessage = error.details[0].message;
    if (errorMessage.includes('is not allowed to be empty')) {
      return res.status(400).json({ message: 'Some required fields are missing' });
    }
    return res.status(400).json({ message: errorMessage });
  }

  next();
};

const validateUpdatePostBody = (req, res, next) => {
  const params = req.body;
  const schema = Joi.object({
    title: Joi.string().required(),
    content: Joi.string().required(),
  });

  const { error } = schema.validate(params);

  if (error) {
    const errorMessage = error.details[0].message;
    if (errorMessage.includes('is required') || errorMessage.includes('is not allowed')) {
      return res.status(400).json({ message: 'Some required fields are missing' });
    }
    return res.status(400).json({ message: errorMessage });
  }

  next();
};

module.exports = {
  validateUserBody,
  validateCategoryBody,
  validatePostBody,
  validateUpdatePostBody,
};