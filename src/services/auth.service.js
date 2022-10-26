// const Joi = require('joi');
const jwtUtil = require('../utils/jwt.util');

// const { User } = require('../models');

// const validateBody = (res, params) => {
//   try {
//     const { email, password } = params;

//     if (email === '' || password === '') {
//       return res.status(400).json({ message: 'Some required fields are missing' });
//     }

//     return params;
//   } catch (e) {
//     res.status(500).json({ message: 'Algo deu errado' });
//   }

//   return params;
// };

// const validateLogin = async ({ email, password }) => {
//   // SELECT * FROM USERS WHERE EMAIL = XXXXX
//   const user = await User.findOne({ where: { email } });

//   if (!user || user.password !== password) {
//     const e = new Error('Usuário ou senha não válidos!');
//     e.name = ' Não autorizado';
//     throw e;
//   }

//   // const { password: _, ...userWithoutPassword } = user.dataValues;

//   // const token = jwtUtil.createToken(userWithoutPassword);

//   const token = process.env.JWT_SECRET;

//   return token;
// };

const validateToken = (token) => {
  if (!token) {
    const e = new Error('Token obrigatório!');
    e.name = 'Token obrigatório';
    throw e;
  }

  const user = jwtUtil.validateToken(token);

  return user;
};

module.exports = { validateToken };
// module.exports = { validateLogin, validateToken };
// module.exports = { validateBody, validateLogin, validateToken };
// module.exports = { validateBody, validateLogin };