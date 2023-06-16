const Auction = require('../models/Auction');

exports.getAll = () => Auction.find({}).populate('author');

exports.create = (ownerId, bidData) => Auction.create({ ...bidData, author: ownerId});

exports.getOne = (id) => Auction.findById(id).lean();

exports.deleteById = (id) => Auction.findByIdAndDelete(id);