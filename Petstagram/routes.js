const router = require('express').Router();

const homeController = require('./controllers/homeController');
const authController = require('./controllers/authController');
const petsController = require('./controllers/petsController');

// TODO: add routes
router.use(homeController);
router.use(authController);
router.use('/pets', petsController)
router.all('*', (req, res) => {
    res.render('home/404'); 
});

module.exports = router;