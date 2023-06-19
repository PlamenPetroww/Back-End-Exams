const router = require('express').Router();

const homeController = require('./controllers/homeController');
const authController = require('./controllers/authController');
const courseController = require('./controllers/courseController');
//const cryptoController = require('./controllers/cryptoController');

// TODO: add routes
router.use(homeController);
router.use(authController);
router.use('/course', courseController);
router.all('*', (req, res) => {
    //res.render('home/404'); 
    res.render('home');
});

module.exports = router;