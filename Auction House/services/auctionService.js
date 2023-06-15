const Auction = require('../models/Auction');

exports.create = (ownerId, bidData) => Auction.create({ ...bidData, owner: ownerId});