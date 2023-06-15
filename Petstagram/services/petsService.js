const Pet = require('../models/Pets');

exports.getAll = () => Pet.find({}).lean();

exports.create = (ownerId, petsData) => Pet.create({ ...petsData, owner: ownerId });

exports.getOne = (id) => Pet.findById(id).lean();

exports.edit = (id, petInfo) => Pet.findByIdAndUpdate(id, petInfo, { runValidators: true });

exports.delete = (id) => Pet.findByIdAndDelete(id);

exports.addComment = async (photoId, commentData) => {
    const photo = await Pet.findById(photoId);

    photo.comments.push(commentData);

    return photo.save();
};