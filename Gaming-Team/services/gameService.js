const Game = require('../models/Game');

exports.getAll = () => Game.find({}).lean();

exports.getOne = (id) => Game.findById(id).lean();

exports.search = async (name, platform) => {
    let game = await this.getAll();

    if(name) {
        game = game.filter(x => x.name.toLowerCase() == name.toLowerCase());
    }

    if(platform) {
        game = game.filter(x => x.platform == platform);
    }

    return game;
};

exports.buy = async (userId, gameId) =>  {
    const game = await Game.findById(gameId);
    game.boughtBy.push(userId);

    return game.save();
}

exports.create = (ownerId, gameData) => Game.create({...gameData, owner: ownerId});

exports.edit = (id, gameData) => Game.findByIdAndUpdate(id, gameData, {runValidators: true});

exports.delete = (id) => Game.findByIdAndDelete(id)
