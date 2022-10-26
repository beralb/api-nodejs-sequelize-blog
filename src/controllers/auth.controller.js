// const authService = require('../services/auth.service');

const { User } = require('../models');

const { createToken } = require('../utils/jwt.util');

const login = async (req, res) => {
    // const { email, password } = authService.validateBody(req.body);
    const { email, password } = req.body;

    if (email === '' || password === '') {
        return res.status(400).json({ message: 'Some required fields are missing' });
    }

    const user = await User.findOne({ where: { email } });
    if (!user || user.password !== password) {
        return res.status(400).json({ message: 'Invalid fields' });
    }

    // const token = await authService.validateLogin({ email, password });

    // const token = process.env.JWT_SECRET;

    const token = createToken(email);

    res.status(200).json({ token });
};

module.exports = { login };
