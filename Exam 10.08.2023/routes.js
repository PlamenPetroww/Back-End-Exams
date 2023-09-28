const router = require('express').Router();

const homeController = require('./controllers/homeController');
const authController = require('./controllers/authController');
const heroeController = require('./controllers/heroeController');

// TODO: add routes
router.use(homeController);
router.use(authController);
router.use('/heroe', heroeController)
router.all('*', (req, res) => {
    res.render('home/404'); 
});

module.exports = router;