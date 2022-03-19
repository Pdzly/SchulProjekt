var express = require("express");
const { userdb } = require("../mysql/userdb");
var router = express.Router();
var accesstokens = {};
router.post("/getuser", function (req, res, next) {
  var data = req.body;
  if (typeof data === "undefined" || data === null || data.length === 0) {
    res.json({ success: false });
    return;
  }
  if (data.Id) {
    userdb.getbyid(data.Id).then((dt) => {
      res.json({ success: true, data: dt.clean() });
    });
  } else if (data.EMailAdresse) {
    userdb.getbyemail(data.EMailAdresse).then((dt) => {
      res.json({ success: true, data: dt.clean() });
    });
  } else if (data.Name) {
    userdb.getbybn(data.Name).then((dt) => {
      res.json({ success: true, data: dt.clean() });
    });
  } else {
    res.json({ success: false, message: "Id oder Name muss genannt sein!" });
    return;
  }
});

router.post("/verifyuser", function (req, res, next) {
  var data = req.body;
  if (data === null || data.length === 0) {
    res.json({ success: false, message: "Keine Angaben" });
    return;
  }
  let hash =
    ((Math.random() * 10000000) / Math.random()) *
    10000000 *
    Math.random() *
    10000000;

  if (data.Id) {
    userdb.getbyid(data.Id).then((dt) => {
      let iscorrect = dt.Passwort === "" + data.Passwort;
      dt = dt.clean();
      if (iscorrect) {
        dt.accesstoken = hash;
        accesstokens[hash] = true;
      }
      res.json({ success: dt.IsValid, data: dt, correct: iscorrect });
    });
  } else if (data.Name) {
    userdb.getbybn(data.Name).then((dt) => {
      console.log(dt);
      let iscorrect = dt.Passwort === "" + data.Passwort;
      dt = dt.clean();
      if (iscorrect) {
        dt.accesstoken = hash;
        accesstokens[hash] = true;
      }
      res.json({ success: dt.IsValid, data: dt, correct: iscorrect });
    });
  } else if (data.EMailAdresse) {
    userdb.getbyemail(data.EMailAdresse).then((dt) => {
      let iscorrect = dt.Passwort === "" + data.Passwort;
      dt = dt.clean();
      if (iscorrect) {
        dt.accesstoken = hash;
        accesstokens[hash] = true;
      }
      res.json({ success: dt.IsValid, data: dt, correct: iscorrect });
    });
  } else {
    res.json({ success: false, message: "Id oder Name muss genannt sein!" });
    return;
  }
});

router.post("/register", function (req, res, next) {
  var data = req.body;
  if (data === null || data.length === 0) {
    res.json({ success: false });
    return;
  }
  if (!data.email || !data.benutzername || !data.passwort) {
    res.json({
      success: false,
      message: "Benutzername, Name und Passwort muss genannt sein!",
    });
    return;
  }
  let prom = [];
  prom[0] = userdb.getbybn(data.benutzername);

  prom[1] = userdb.getbyemail(data.email);

  Promise.all(prom).then((val) => {
    console.log(val);
    if (
      typeof val[0] !== "undefined" &&
      val[0] !== null &&
      val[0].IsValid === true
    ) {
      res.json({
        success: false,
        message: "Benutzername ist schon vorhanden!",
      });
    } else if (
      typeof val[1] !== "undefined" &&
      val[1] !== null &&
      val[1].IsValid === true
    ) {
      res.json({ success: false, message: "Email ist schon vorhanden!" });
    } else {
      let user = new userdb(
        false,
        data.benutzername,
        data.passwort,
        data.email
      );
      user.save().then((newuser) => {
        res.json({ success: true, data: newuser });
      });
    }
  });
});

module.exports = {router: router, accesstokens:  accesstokens};

