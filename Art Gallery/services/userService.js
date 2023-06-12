const User = require('../models/User');

exports.getOne = (userId) => User.findById(userId);
/* exports.addPublication = async (userId, publicationId) => {
    const user = await User.findById(userId);

    user.publications.push(publicationId);

    await user.save();

    return user;
} */