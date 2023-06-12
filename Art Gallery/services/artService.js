const Publication = require('../models/Publication');

exports.create = (ownerId, artData) => Publication.create({ ...artData, author: ownerId });

exports.getAll = () => Publication.find({}).lean();

exports.getOne = (id) => Publication.findById(id);

exports.getOneDetailed = (publicationId) => Publication.findById(publicationId).populate('author');

exports.getById = (id) => Publication.findById(id).lean();

exports.edit = (id, publicData) => Publication.findByIdAndUpdate(id, publicData, { runValidators: true });

exports.delete = (id) => Publication.findByIdAndDelete(id);