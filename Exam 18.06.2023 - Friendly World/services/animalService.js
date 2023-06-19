const Animal = require('../models/Animal');

exports.create = (ownerId, animalInfo) => Animal.create({ ...animalInfo, owner: ownerId });

exports.getAll = () => Animal.find({}).lean();

exports.search = async (location) => {

    let animal = await this.getAll();

    if(location) {
        animal = animal.filter(x => x.location.toLowerCase() == location.toLowerCase());
    }

    return animal;
    
}

exports.getOne = (id) => Animal.findById(id).lean();

exports.edit = (id, animalData) => Animal.findByIdAndUpdate(id, animalData, {runValidators: true});

exports.deleteById = (id) => Animal.findByIdAndDelete(id);

exports.donatedAnimal = async (animalId, userId) => {
    const existing = await Animal.findById(animalId);
    existing.donation.push(userId);
    return existing.save();
}