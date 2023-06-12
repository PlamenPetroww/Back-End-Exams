const Publication = require('../models/Publication');

exports.create = (ownerId, artData) => Publication.create({ ...artData, author: ownerId });

exports.getAll = () => Publication.find({}).lean();

exports.getOne = (publicationId) => Publication.findById(publicationId).lean();

exports.getById = (id) => Publication.findById(id).lean();

exports.edit = (id, publicationId) => Publication.findByIdAndUpdate(id, publicationId, { runValidators: true });