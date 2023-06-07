const Publication = require('../models/Publication');

exports.create = (ownerId, artData) => Publication.create({...artData, author: ownerId});

exports.getAll = () => Publication.find({}).lean();

exports.getOne = (id) => Publication.findById(id).lean();

exports.publicatedUser = async (pictureId, userId) => {
    const existing = await Publication.findById(pictureId);
    existing.users.puh(userId),
    existing.userCount++;
    return existing.save();
};

exports.getbyId = (id) => Publication.findById(id).lean();