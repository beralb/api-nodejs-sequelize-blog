const { User } = require('../models');

const { createToken } = require('../utils/jwt.util');

const loginAuth = async (req, res) => {
    const { email, password } = req.body;

    if (email === '' || password === '') {
        return res.status(400).json({ message: 'Some required fields are missing' });
    }

    const user = await User.findOne({ where: { email } });
    if (!user || user.password !== password) {
        return res.status(400).json({ message: 'Invalid fields' });
    }

    req.session.loggedin = true;
    req.session.username = email;

    const token = createToken(email);

    res.status(200).json({ token });
};

module.exports = { loginAuth };
