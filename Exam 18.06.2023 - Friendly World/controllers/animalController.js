const router = require('express').Router();
const { isAuth } = require('../middlewares/authMiddleware');
const { getErrorMessage } = require('../utils/errorUtils');
const animalService = require('../services/animalService');
const Animal = require('../models/Animal');
const donatedAnimal = require('../services/animalService');


router.get('/dashboard', async (req, res) => {
    const animal = await animalService.getAll();

    res.render('animal/dashboard', { animal })
});

router.get('/create', isAuth, (req, res) => {
    res.render('animal/create')
});

router.post('/create', isAuth, async (req, res) => {
    const animalInfo = req.body;

    try {
        await animalService.create(req.user._id, animalInfo);
        res.redirect('/animal/dashboard');
    } catch (error) {
        return res.render('animal/create', { body: animalInfo, error: getErrorMessage(error) });
    }
});

router.get('/search', async (req, res) => {
    const { location } = req.query;
    const animal = await animalService.search(location);

    res.render('animal/search', { animal, location })
})

router.get('/:id/details', async (req, res) => {

    const animal = await animalService.getOne(req.params.id);

    const isOwner = animal.owner == req.user?._id;
    const isDonated = animal.donation?.some(id => id == req.user?._id);
    res.render('animal/details', { animal, isOwner, isDonated });

});

router.get('/:id/edit', isAuth, async (req, res) => {
    const animal = await animalService.getOne(req.params.id);

    try {
        res.render('animal/edit', { animal });
    } catch (error) {
        res.render('animal/edit', { error: getErrorMessage(error) });
    }
});

router.post('/:id/edit', isAuth, async (req, res) => {
    const animalData = req.body;

    try {
        const data = await animalService.edit(req.params.id, animalData);
        res.redirect(`/animal/${req.params.id}/details`);
    } catch (error) {
        const animal = await animalService.getOne(req.params.id);
        res.render('animal/edit', { animalData: animalData, error: getErrorMessage(error), animal: animal })
    }
});

router.get('/:id/delete', isAuth, async (req, res) => {
    try {
        await animalService.deleteById(req.params.id);
    } catch (error) {
        return res.render({ error: getErrorMessage(error) });
    }
    return res.redirect('/animal/dashboard');
});

router.get('/:id/donate', isAuth, async (req, res) => {
    const animalId = req.params.id;
    const userId = req.user._id;
    const animal = await Animal.findById(animalId);
    const isOwner = animal.owner === userId;

    if (!isOwner && !animal.donation.includes(userId)) {
        await animalService.donatedAnimal(animalId, userId);
    }

    res.redirect(`/animal/${animalId}/details`);
});


module.exports = router;
