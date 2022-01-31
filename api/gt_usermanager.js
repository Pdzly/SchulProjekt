var express = require('express');
const { userdb } = require('../mysql/userdb');
var router = express.Router();
var user = []

router.post('/getuser', function (req, res, next) {
    var data = req.body
    if (typeof data === "undefined" ||  data === null || data.length === 0) {
        res.json([{ success: false }])
        return
    }
    if (data.Id) {
        userdb.getbyid(data.Id)
            .then(dt => {
                res.json([{ success: true, data: dt.clean() }]);
            })
    } else if (data.Name) {
        userdb.getbyname(data.Name)
            .then(dt => {
                res.json([{ success: true, data: dt.clean() }]);
            })
    } else {
        res.json([{ success: false, message: "Id oder Name muss genannt sein!" }])
        return
    }
});

router.post('/verifyuser', function (req, res, next) {
    var data = req.body

    if (data === null || data.length === 0) {
        res.json([{ success: false }])
        return
    }
    if (data.Id) {
        userdb.getbyid(data.Id)
            .then(dt => {
                let iscorrect = dt.Passwort === data.Passwort
                dt = dt.clean()
                res.json([{ success: true, data: dt, correct:  iscorrect}]);
            })
    } else if (data.Name) {
        userdb.getbyname(data.Name)
            .then(dt => {
                let iscorrect = dt.Passwort === data.Passwort
                dt = dt.clean()
                res.json([{ success: true, data: dt, correct: iscorrect }]);
            })
    } else if (data.EMailAdresse) {
        userdb.getbyname(data.EMailAdresse)
            .then(dt => {
                let iscorrect = dt.Passwort === data.Passwort
                dt = dt.clean()
                res.json([{ success: true, data: dt, correct: iscorrect }]);
            })
    } else {
        res.json([{ success: false, message: "Id oder Name muss genannt sein!" }])
        return
    }
});

router.get('/adduser', function (req, res, next) {
    user.push(data)

    res.json([{ success: true, data: data }]);
});

router.get('/createuser', function (req, res, next) {
    var data = req.body

    if (data === null || data.length === 0) {
        res.json([{ success: false }])
        return
    }
    if (data.Id) {
        userdb.getbyid(data.Id)
            .then(dt => {
                if(typeof dt !== "undefined" && dt !== null){
                    res.json([{ success: false, message: "User mit so einer ID ist schon vorhanden!" }])
                }
            })
    } else if (data.Name) {
        userdb.getbyname(data.Name)
            .then(dt => {
                if(typeof dt !== "undefined" && dt !== null){
                    res.json([{ success: false, message: "User Name ist schon vorhanden!" }])
                }
            })
    }  else if (data.EMailAdresse) {
        userdb.getbyemail(data.EMailAdresse)
            .then(dt => {
                if(typeof dt !== "undefined" && dt !== null){
                    res.json([{ success: false, message: "Email ist schon vorhanden!" }])
                }
            })
    }else {
        res.json([{ success: false, message: "Id oder Name muss genannt sein!" }])
        return
    }
    res.json([{ success: true, data: data }]);
});

module.exports = router