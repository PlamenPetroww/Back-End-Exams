const router = require('express').Router();

const homeController = require('./controllers/homeController');
const authController = require('./controllers/authController');
const animalController = require('./controllers/animalController');


// TODO: add routes
router.use(homeController);
router.use(authController);
router.use('/animal', animalController);
router.all('*', (req, res) => {
    res.render('home/404'); 
});

module.exports = router;