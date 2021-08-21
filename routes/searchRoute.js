const router = require('express').Router();
const {searchController} = require('../controller/searchController');

router.get('/' , searchController)

module.exports = router;