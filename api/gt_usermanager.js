var express = require('express');
const { userdb } = require('../mysql/userdb');
var router = express.Router();

router.post('/getuser', function (req, res, next) {
    var data = req.body
    if (typeof data === "undefined" || data === null || data.length === 0) {
        res.json({ success: false })
        return
    }
    if (data.Id) {
        userdb.getbyid(data.Id)
            .then(dt => {
                res.json({ success: true, data: dt.clean() });
            })
    } else if (data.Name) {
        userdb.getbyname(data.Name)
            .then(dt => {
                res.json({ success: true, data: dt.clean() });
            })
    } else {
        res.json({ success: false, message: "Id oder Name muss genannt sein!" })
        return
    }
});

router.post('/verifyuser', function (req, res, next) {
    var data = req.body

    if (data === null || data.length === 0) {
        res.json({ success: false })
        return
    }
    if (data.Id) {
        userdb.getbyid(data.Id)
            .then(dt => {
                let iscorrect = dt.Passwort === data.Passwort
                dt = dt.clean()
                res.json({ success: true, data: dt, correct: iscorrect });
            })
    } else if (data.Name) {
        userdb.getbyname(data.Name)
            .then(dt => {
                let iscorrect = dt.Passwort === data.Passwort
                dt = dt.clean()
                res.json({ success: true, data: dt, correct: iscorrect });
            })
    } else if (data.EMailAdresse) {
        userdb.getbyname(data.EMailAdresse)
            .then(dt => {
                let iscorrect = dt.Passwort === data.Passwort
                dt = dt.clean()
                res.json({ success: true, data: dt, correct: iscorrect });
            })
    } else {
        res.json({ success: false, message: "Id oder Name muss genannt sein!" })
        return
    }
});

router.get('/register', function (req, res, next) {
    var data = req.body

    if (data === null || data.length === 0) {
        res.json({ success: false })
        return
    }
    if (!data.email || !data.benutzername || !data.passwort) {
        res.json({ success: false, message: "Benutzername, Name und Passwort muss genannt sein!" })
        return
    }
    let prom = []
    prom[0] = userdb.getbyname(data.benutzername)

    prom[1] = userdb.getbyemail(data.email)

    Promise.all(prom).then(val => {
        if (typeof val[0] !== "undefined" && val[0] !== null) {
            res.json({ success: false, message: "Benutzername ist schon vorhanden!" })
        } else if (typeof val[1] !== "undefined" && val[1] !== null) {
            res.json({ success: false, message: "Email ist schon vorhanden!" })
        } else {
            new userdb(null, this.data.benutzername, this.data.Passwort, this.data.email)
            res.json({ success: true })
        }
    })
});

module.exports = router