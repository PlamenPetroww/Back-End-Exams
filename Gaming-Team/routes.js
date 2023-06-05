const router = require('express').Router();

const homeController = require('./controllers/homeController');
const authController = require('./controllers/authController');
const gameController = require('./controllers/gameController');

// TODO: add routes
router.use(homeController);
router.use(authController);
router.use('/gaming', gameController);
router.all('*', (req, res) => {
    res.render('home/404'); 
});

module.exports = router;