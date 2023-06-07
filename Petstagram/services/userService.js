const User = require('../models/User');

exports.getOneForProfile = (userId) => User.findById(userId);