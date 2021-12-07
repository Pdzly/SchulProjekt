var express = require('express');
var router = express.Router();
var user = []

/* GET home page. */
router.post('/getuser', function (req, res, next) {
    var data = req.body
    
    if (data === null || data.length === 0) {
        res.json([{success: false}])
        return
    }
    res.json([{success: true, data: data}]);
});

router.get('/adduser', function (req, res, next) {
    user.push(data)

    res.json([{success: true, data: data}]);
});

function getgames(){

}

module.exports = router