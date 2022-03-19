var express = require('express');
const formidable = require('formidable');
var router = express.Router();
var games = []

var games = require('./gt_games');
var user = require('./gt_usermanager.js');

router.use('/games', games);
router.use('/user', user.router);

router.get('/', function (req, res, next) {
    res.json([{success: true}]);
});

module.exports = router