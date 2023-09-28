const Heroe = require('../models/Heroe');

exports.getAll = () => Heroe.find({}).lean();

exports.create = (ownerId, heroeData) => Heroe.create({...heroeData, owner: ownerId})

exports.getOne = (id) => Heroe.findById(id).lean();

exports.edit = (id, heroeData) => Heroe.findByIdAndUpdate(id, heroeData, {runValidators: true})

exports.deleteById = (id) => Heroe.findByIdAndDelete(id);

exports.voted = async (heroeId, userId) => {
    const existing = await Heroe.findById(heroeId);
    existing.votes.push(userId);
    return existing.save();
}