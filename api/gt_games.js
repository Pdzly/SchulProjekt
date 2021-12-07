var express = require('express');
var router = express.Router();
var games = []

/* GET home page. */
router.post('/setgames', function (req, res, next) {
    var data = req.body
    
    if (data === null || data.length === 0) {
        res.json([{success: false}])
        return
    }
    games.push(data)
    res.json([{success: true, data: data}]);
});

router.get('/getgames', function (req, res, next) {
    var data = games

    res.json([{success: true, data: data}]);
});

function getgames(){

}

module.exports = router