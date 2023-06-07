const Publication = require('../models/Publication');

exports.create = (ownerId, artInfo) => Publication.create({...artInfo, owner: ownerId});