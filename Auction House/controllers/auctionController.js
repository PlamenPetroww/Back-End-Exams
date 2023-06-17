const router = require('express').Router();
const auctionService = require('../services/auctionService');
const { isAuth } = require('../middlewares/authMiddleware');
const { getErrorMessage } = require('../utils/errorUtils');
const { categoryMap } = require('../constants');
const Auction = require('../models/Auction');
const User = require('../models/User');

router.get('/browse', async (req, res) => {

    const auctions = await auctionService.getAll().lean();

    res.render('auction/browse', { auctions })
});

router.get('/create', isAuth, async (req, res) => {
    res.render('auction/create');
});

router.post('/create', isAuth, async (req, res) => {
    const bidData = req.body;
    author = req.user._id;
    try {
        await auctionService.create(req.user._id, bidData);
        res.redirect('/auction/browse');
    } catch (error) {
        return res.render('auction/create', { body: bidData, error: getErrorMessage(error) })
    }
});



router.get('/:id/details', async (req, res) => {
    const offer = await auctionService.getOne(req.params.id);
    const isOwner = offer.author?.toString() === req.user?._id.toString();
    const creatorId = offer.author;
    const creator = await User.findById(creatorId);
    const creatorFirstName = creator.firstName;
    const creatorLastName = creator.lastName

    try {
        if (isOwner) {

            res.render('auction/details-owner', { offer, isOwner, creatorFirstName, creatorLastName });
        } else {
            res.render('auction/details', { offer, creatorFirstName, creatorLastName });
        }
    } catch (error) {
        res.status(400).render('auction/404', { error: getErrorMessage(error) })
    }
});


//const getOffer = require('../services/auctionService');

router.post('/:id/buy', async (req, res) => {
    const offerId = req.params.id;
    let { amount } = req.body;
    const offer = await auctionService.getOne(offerId);
    const userId = req.user._id;
    amount = Number(amount)
    try {
        if (Number(amount) <= offer.price) {
            const error = [];
            error.push({ msg: 'This is not the best price. Bid more please' });
            throw error;
        }
        await auctionService.getOffer(offerId, userId, amount);
        res.redirect(`details/${id}`);
    } catch (error) {
        res.render('auction/details', { error: getErrorMessage(error) })
    }
});

router.post('/:id/details', isAuth, async (req, res) => {
    const { offer } = req.body;
    const offerId = req.params.id;

    await auctionService.getOffer(offerId, offer);

    res.redirect(`/${id}/details`);
});




router.get('/:id/edit', isAuth, async (req, res) => {
    const bidData = await auctionService.getOne(req.params.id);

    const categories = Object.keys(categoryMap).map(key => ({
        value: key,
        label: categoryMap[key],
        isSelected: bidData.category == categoryMap[key],
    }));
    try {
        res.render('auction/edit', { bidData, categories });
    } catch (error) {
        return res.render('auction/edit', { error: getErrorMessage(error) })
    }
});


router.get('/:id/delete', isAuth, async (req, res) => {
    try {
        await auctionService.deleteById(req.params.id);
    } catch (error) {
        return res.status(400).render({ error: getErrorMessage(error) })
    }
    res.redirect('/auction/browse')
});




module.exports = router;