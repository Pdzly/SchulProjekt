var express = require('express');
var router = express.Router();
var games = []

var games = require('./gt_games');
var user = require('./gt_usermanager.js');

router.use('/games', games);
router.use('/user', user);

router.get('/', function (req, res, next) {
    res.json([{success: true}]);
});

module.exports = router