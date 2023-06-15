const router = require('express').Router();
const auctionService = require('../services/auctionService');
const { isAuth } = require('../middlewares/authMiddleware');
const { getErrorMessage } = require('../utils/errorUtils');

router.get('/browse', async (req, res) => {

    const auctions = await auctionService.getAll();

    res.render('auction/browse', { auctions })
});

router.get('/create', isAuth, async (req, res) => {
    res.render('auction/create');
});

router.post('/create', isAuth, async (req, res) => {
    const bidData = req.body;

    try {
        await auctionService.create(req.user._id, bidData);
        res.redirect('/auction/browse');
    } catch (error) {
        return res.render('auction/create', { body: bidData, error: getErrorMessage(error) })
    }
});


router.get('/:id/details', async (req, res) => {
    const offer = await auctionService.getOne(req.params.id);
    const isOwner = offer.author.toString() === req.user?._id.toString();
    let creator;
    if (isOwner) {
        try {
            res.render('auction/details-owner', { offer, isOwner });
        } catch (error) {
            return res.status(400).render('auction/404', { error: getErrorMessage(error) });
        }
    }

    try {
        res.render('auction/details', { offer });
    } catch (error) {
        return res.render('auction/details', { offer });
    }

});


module.exports = router;