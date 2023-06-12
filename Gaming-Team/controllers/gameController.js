const router = require('express').Router();
const { isAuth } = require('../middlewares/authMiddleware');
const { getErrorMessage } = require('../utils/errorUtils');
const gameService = require('../services/gameService');
const { getSelectPlatform } = require('../utils/viewDataUtils');
const { selectPlatfromMap } = require('../constants');

router.get('/catalog', async (req, res) => {
    const game = await gameService.getAll();

    res.render('gaming/catalog', { game })
});

router.get('/create', isAuth, (req, res) => {
    res.render('gaming/create');
});

router.post('/create', isAuth, async (req, res) => {
    const gameData = req.body;

    try {
        await gameService.create(req.user._id, gameData);
        res.redirect('/');
    } catch (error) {
        return res.render('gaming/create', { body: gameData, error: getErrorMessage(error) });
    }

});

router.get('/search', async (req, res) => {
    const { name, selectPlatfrom } = req.query;
    const game = await gameService.search(name, selectPlatfrom);
    const selectedPlatforms = getSelectPlatform(selectPlatfrom);

    res.render('gaming/search', { game, selectedPlatforms, name })
});

router.get('/:id/details', async (req, res) => {
    const game = await gameService.getOne(req.params.id);

    const isOwner = game.owner == req.user?._id;
    const isBuyer = game.boughtBy?.some(id => id == req.user?._id);

    game.platform = selectPlatfromMap[game.platform];

    res.render('gaming/details', { game, isOwner, isBuyer });
});

router.get('/:gameId/buy', isAuth, async (req, res) => {

    try {
        await gameService.buy(req.user._id, req.params.gameId);
    } catch (error) {
        return res.status(400).render('404', { error: getErrorMessage(error) });
    }
    res.redirect(`/gaming/${req.params.gameId}/details`);
});

router.get('/:id/edit', isAuth, async (req, res) => {
    const game = await gameService.getOne(req.params.id);
    const selectedPlatforms = getSelectPlatform(game.platform);
    try {

        res.render('gaming/edit', { game, selectedPlatforms })
    } catch (error) {
        res.render('game/edit', { error: getErrorMessage(error) });
    }
    //res.render('gaming/edit', { game, selectedPlatforms });
});

router.post('/:id/edit', isAuth, async (req, res) => {
    const gameData = req.body;
    try {
        const data = await gameService.edit(req.params.id, gameData);
        res.redirect(`/gaming/${req.params.id}/details`);
    } catch (error) {
        const game = await gameService.getOne(req.params.id);
        const selectedPlatforms = getSelectPlatform(game.platform);
        res.render('gaming/edit', { gameData: gameData, error: getErrorMessage(error), game: game, selectedPlatforms });
    }

});

router.get('/:id/delete', isAuth, async (req, res) => {
    try {
        await gameService.delete(req.params.id);
    } catch (error) {
        return res.status(400).render({ error: getErrorMessage(error) });
    }
    res.redirect('/')
});

module.exports = router;
