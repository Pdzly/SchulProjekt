var express = require('express');
var router = express.Router();
var games = []
const http = require("https");
const db = require('../mysql/manager');

function getNews() {
    return new Promise(function (res, rej) {
        const options = {
            "method": "GET",
            "hostname": "gaming-news.p.rapidapi.com",
            "port": null,
            "path": "/news",
            "headers": {
                "x-rapidapi-host": "gaming-news.p.rapidapi.com",
                "x-rapidapi-key": "aaad652c75msh3ecf07b9418e8a2p1c5db6jsn5577a25bb8c1",
                "useQueryString": true
            }
        };
        const req = http.request(options, function (res) {
            const chunks = [];

            res.on("data", function (chunk) {
                chunks.push(chunk);
            });

            res.on("end", function () {
                const body = Buffer.concat(chunks);
                res(body)
            });
            req.end();
        });
    })
}


router.get('/getnews', function (req, res, next) {
    getNews().then(news => {
        res.json({
            success: true,
            data: news
        })
    })
});

router.post('/addgames', function (req, res, next) {
    var data = req.body
    if (data === null || data.length === 0) {
        res.json({
            success: false
        })
        return
    }
    games.push(data)
    res.json({
        success: true,
        data: data
    });
});

router.get('/getgames', function (req, res, next) {
    db.querysimple("spielemaster").then(data => {
        res.json({
            success: true,
            data: data
        });
    }, rej => {
        res.json({
            success: false,
            fuck: true
        })
    })
});

router.get('/getgenres', function (req, res, next) {
    db.querysimple("Genre", "*").then(data => {
        res.json({
            success: true,
            data: data
        });
    })

});

router.get('/getplatform', function (req, res, next) {
    db.querysimple("Plattform", "*").then(data => {
        res.json({
            success: true,
            data: data
        });
    })

});

router.get('/getreleaser', function (req, res, next) {
    db.querysimple("Studio", "*").then(data => {
        res.json({
            success: true,
            data: data
        });
    })

});
router.get('/getfsk', function (req, res, next) {
    db.querysimple("FSK", "*").then(data => {
        res.json({
            success: true,
            data: data
        });
    })
});

module.exports = router