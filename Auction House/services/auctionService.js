const Auction = require('../models/Auction');

exports.getAll = () => Auction.find({}).lean();

exports.create = (ownerId, bidData) => Auction.create({ ...bidData, author: ownerId});

exports.getOne = (id) => Auction.findById(id).lean();