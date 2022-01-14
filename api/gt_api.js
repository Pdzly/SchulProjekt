var express = require('express');
const formidable = require('formidable');
var router = express.Router();
var games = []

var games = require('./gt_games');
var user = require('./gt_usermanager.js');

router.use('/games', games);
router.use('/user', user);

router.get('/', function (req, res, next) {
    res.json([{success: true}]);
});

router.post('/uploadbild', function (req, res, next) {
    const form = formidable({ multiples: true, keepExtensions: true });
  
    form.parse(req, (err, fields, files) => {
      if (err) {
        next(err);
        return;
      }
      console.log( files);
      res.writeHead(200, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify({ fields, files }, null, 2));
    });  
});


router.delete('/uploadbild', function (req, res, next) {
  console.log(req)
});

module.exports = router