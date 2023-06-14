const User = require('../models/User');

exports.getOne = userId => User.findById(userId);