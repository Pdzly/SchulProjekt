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

router.post('/findgame', function (req, res, next) {
    const data = req.body
    console.log(data)
    let tosearch = ""
    if (data.Id) {
        tosearch = " SpielID = " + data.Id
    } else if (data.Bezeichnung) {
        tosearch = " Bezeichnung = " + data.Bezeichnung
    } else {
        res.json({
            success: false,
            reason: "Keine Suchparameter"
        })
        return
    }

    db.querysimple("spielemaster", "*", tosearch).then(data => {
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

router.get('/gethighlights', function (req, res, next) {
    db.querycomplex("SELECT * FROM spielemaster ORDER BY RAND() LIMIT 25 ").then(data => {
        res.json({
            success: true,
            data: data
        });
    }, rej => {
        console.log(rej)
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

router.get('/getplattform', function (req, res, next) {
    db.querysimple("Plattform", "*").then(data => {
        res.json({
            success: true,
            data: data
        });
    })
});

router.post('/getplattform', function (req, res, next) {
    const data = req.body
    let tosearch = ""
    if (data.Id) {
        tosearch = " PlattformID = " + data.Id
    } else if (data.Bezeichnung) {
        tosearch = " Bezeichnung = " + data.Bezeichnung
    } else {
        res.json({
            success: false,
            reason: "Keine Suchparameter"
        })
    }
    db.querysimple("Plattform", "*", tosearch).then(data => {
        res.json({
            success: true,
            data: data
        });
    })
});

router.get('/getstudio', function (req, res, next) {
    db.querysimple("Studio", "*").then(data => {
        res.json({
            success: true,
            data: data
        });
    })
});

router.post('/findstudio', function (req, res, next) {
    const data = req.body
    let tosearch = ""
    if (data.Id) {
        tosearch = " StudioID = " + data.Id
    } else if (data.Bezeichnung) {
        tosearch = " Bezeichnung = " + data.Bezeichnung
    } else {
        res.json({
            success: false,
            reason: "Keine Suchparameter"
        })
        return
    }

    db.querysimple("Studio", "*", tosearch).then(data => {
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

router.get('/getfsk', function (req, res, next) {
    db.querysimple("FSK", "*").then(data => {
        res.json({
            success: true,
            data: data
        });
    })
});

router.get('/findfsk', function (req, res, next) {
    const data = req.body
    let tosearch = ""
    if (data.Id) {
        tosearch = " FSKID = " + data.Id
    } else if (data.Bezeichnung) {
        tosearch = " FSKText = " + data.Bezeichnung
    } else {
        res.json({
            success: false,
            reason: "Keine Suchparameter"
        })
        return
    }
    db.querysimple("FSK", "*", tosearch).then(data => {
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
    db.querysimple("FSK", "*").then(data => {
        res.json({
            success: true,
            data: data
        });
    })
});

module.exports = router