const router = require('express').Router();
const petsService = require('../services/petsService');
const { isAuth, isAuthenticated } = require('../middlewares/authMiddleware');
const { getErrorMessage } = require('../utils/errorUtils');
const User = require('../models/User');

router.get('/catalog', async (req, res) => {

    const pets = await petsService.getAll()


    res.render('pets/catalog', { pets });
});

router.get('/create', isAuth, async (req, res) => {

    res.render('pets/create');
});

router.post('/create', isAuth, async (req, res) => {
    const petsData = {
        ...req.body,
        owner: req.user._id,
    }

    try {
        await petsService.create(req.user._id, petsData);
        res.redirect('/');
    } catch (error) {
        return res.render('pets/create', { body: petsData, error: getErrorMessage(error) });
    }
});

router.get('/:id/details', isAuth, async (req, res) => {
    const pet = await petsService.getOne(req.params.id);
    const isOwner = pet.owner?.toString() === req.user?._id.toString();

    res.render('pets/details', { pet, isOwner })
});


router.get('/:id/edit', isAuth, async (req, res) => {
    try {
        const pet = await petsService.getOne(req.params.id);
        res.render('pets/edit', { pet });
    } catch (error) {
        res.render('pets/edit', { error: getErrorMessage(error) });
    }
});

router.post('/:id/edit', isAuth, async (req, res) => {
    const petInfo = req.body;

    try {
        const pet = await petsService.edit(req.params.id, petInfo);
        res.redirect(`/pets/${req.params.id}/details`);
    } catch (error) {
        const pet = await petsService.getOne(req.params.id);
        res.render('pets/edit', { petInfo: petInfo, error: getErrorMessage(error), pet: pet });
    }
});

router.get('/:id/delete', isAuth, async (req, res) => {
    try {
        const pet = await petsService.delete(req.params.id);
    } catch (error) {
        return res.status(400).redirect('/404', { error: getErrorMessage(error) });
    }
    res.redirect('/pets/catalog');
});

router.post('/:photoId/comments', async (req, res) => {
    const photoId = req.params.photoId;
    const { message } = req.body;
    const userId = req.user._id;

    await petsService.addComment(photoId, { userId, message });

    res.redirect(`/pets/${req.params.photoId}/details`);
    //res.redirect(`/pets/${photoId}/details`);
});

module.exports = router;