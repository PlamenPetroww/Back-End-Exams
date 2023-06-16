const router = require('express').Router();
const auctionService = require('../services/auctionService');
const { isAuth } = require('../middlewares/authMiddleware');
const { getErrorMessage } = require('../utils/errorUtils');
const { categoryMap } = require('../constants');
const Auction = require('../models/Auction');

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

    try {
        if (isOwner) {
            res.render('auction/details-owner', { offer, isOwner });
        } else {
            res.render('auction/details', { offer });
        }
    } catch (error) {
        res.status(400).render('auction/404', { error: getErrorMessage(error) })
    }
});

router.get('/:id/buy', isAuth, async (req, res)=> {
    const offerId = req.params.id;
    const userId = req.user._id;

    const offer = await Auction.getById(offerId);

    const isOwner = offer.author === userId;

    if(!isOwner && !offer.users.includes(userId)) {
        await auctionService.buy(offerId, userId)
    }

    res.redirect(`auction/${offerId}/details`);
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