const User = require('../models/User');
const bcrypt = require('bcrypt');

const jwt = require('../lib/jsonwebtoken');
const { SECRET } = require('../constants');

exports.findByUsername = (username) => User.findOne({ username });

//exports.findByEmail = (email) => User.findOne({ email });

exports.register = async (username, email, password, repeatPassword) => {
    if (password !== repeatPassword) {
        throw new Error('Password missmatch!');
    }
    // TODO: check if user or email exists
    const existingUser = await User.findOne({
        $or: [
            { email },
            { username },
        ]
    });
    if(username.length < 2) {
        throw new Error('Username is too short!');
    }

    if(email.length < 10) {
        throw new Error('Email is too short!');
    }
    if (existingUser) {
        throw new Error('User exists!');
    }

    // TODO: Validate password
    if (password.length < 4) {
        throw new Error('Password too short!');
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    await User.create({ username,email, password: hashedPassword });

    return this.login(username, password);
};

exports.login = async (username, password) => {
    // User exists
    const user = await this.findByUsername(username);
    if (!user) {
        throw new Error('Invalid username or password');
    }
    // Password is valid
    const isValid = await bcrypt.compare(password, user.password);
    if (!isValid) {
        throw new Error('Invalid username or password');
    }

    // Generate token
    const payload = {
        _id: user._id,
        username: user.username,
    };
    const token = await jwt.sign(payload, SECRET);

    return token;
};

