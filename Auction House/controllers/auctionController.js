const router = require('express').Router();
const auctionService = require('../services/auctionService');
const { isAuth } = require('../middlewares/authMiddleware');
const { getErrorMessage } = require('../utils/errorUtils');

router.get('/browse', async (req, res) => {
    
    const offers = await auctionService.getAll();

    res.render('auction/browse', { offers })
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



module.exports = router;