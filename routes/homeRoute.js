const router = require('express').Router();
const jewVarify = require('../middlewares/jwtMiddleware');
const {homeController} = require('../controller/homeController');

router.get('/home' , jewVarify , homeController)

module.exports = router;