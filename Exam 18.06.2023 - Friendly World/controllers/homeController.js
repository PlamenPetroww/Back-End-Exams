const router = require('express').Router();
const { getAll } = require('../services/animalService');
const animalService = require('../services/animalService');

router.get('/', async (req, res) => {
    const animalResult = await animalService.getAll();
    const animals = animalResult.map(x => ({ ...x }));
    const lastThreeAnimals = animals.slice(-3);
    res.render('home', { animals: lastThreeAnimals });
  });
  

module.exports = router;