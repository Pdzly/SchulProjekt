var express = require('express');
var router = express.Router();
var games = []

var games = require('./api/gt_games');
var user = require('./api/gt_usermanager.js');

router.use('/games', games);
router.use('/user', games);

router.get('/', function (req, res, next) {
    res.json([{success: true}]);
});

module.exports = {
    router: router, 
};