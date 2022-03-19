class userdb {
  constructor(
    BenutzerId,
    Benutzername,
    Passwort,
    Email,
    Geburtsdatum,
    Recht,
    Registrierungsdatum
  ) {
    if (
      typeof Benutzername !== "undefined" ||
      (BenutzerId && typeof BenutzerId.Benutzername !== "undefined")
    ) {
      this.IsValid = true;
      if (BenutzerId && typeof BenutzerId === "object") {
        this.BenutzerId = BenutzerId.BenutzerId;
        this.Benutzername = BenutzerId.Benutzername;
        this.Passwort = BenutzerId.Passwort;
        this.Email = BenutzerId.Email;
        this.Geburtsdatum = BenutzerId.Geburtsdatum;
        this.Recht = BenutzerId.Recht ?? 1;
        this.Registrierungsdatum =
          BenutzerId.Registrierungsdatum ?? Date().toISOString().substring(0, 10);
      } else {
        this.BenutzerId = BenutzerId;
        this.Benutzername = Benutzername;
        this.Passwort = Passwort;
        this.Email = Email;
        this.Geburtsdatum = Geburtsdatum;
        this.Recht = Recht ?? 1;
        this.Registrierungsdatum =
          Registrierungsdatum ?? new Date().toISOString().substring(0, 10);
      }
    } else {
      this.IsValid = false;

      return false;
    }
  }

  clean() {
    let obj = Object.assign({}, this);
    obj.Passwort = null;
    return obj;
  }

  save() {
    return new Promise((res, rej) => {
      let str = `INSERT INTO Benutzer VALUES("${this.Id}", "${this.Benutzername}", "${this.Passwort}", "${this.Email}", "${this.Recht}","${this.Registrierungsdatum}") ON DUPLICATE KEY UPDATE Id=VALUES(Id), Benutzername=VALUES(Benutzername), Passwort=VALUES(Passwort), Email=VALUES(Email), Email=VALUES(Recht), Registrierungsdatum=VALUES(Registrierungsdatum);`;
      if (!this.BenutzerId) {
        str = `INSERT INTO Benutzer(Benutzername, Passwort, Email, Recht, Registrierungsdatum) VALUES("${this.Benutzername}", "${this.Passwort}", "${this.Email}", "${this.Recht}", "${this.Registrierungsdatum}") ON DUPLICATE KEY UPDATE Benutzername=VALUES(Benutzername), Passwort=VALUES(Passwort), Email=VALUES(Email), Email=VALUES(Recht), Registrierungsdatum=VALUES(Registrierungsdatum);`;
      }
      db.querycomplex(str)
        .then((data) => {
          if(!this.BenutzerId) {
            this.BenutzerId = insertId
          }
          res(data);
        })
        .catch((err) => {
          rej(err);
        });
    });
  }

  static getall() {
    return new Promise((res, rej) => {
      db.querySimple("Benutzer")
        .then((users) => {
          res(users.rows);
        })
        .catch((err) => {
          rej(err);
        });
    });
  }

  static getbyid(id) {
    return new Promise((res, rej) => {
      db.querySimple("Benutzer", "*", ` BenutzerId='${id}'`)
        .then((user) => {
          res(new userdb(user.rows[0]));
        })
        .catch((err) => {
          rej(err);
        });
    });
  }

  static getbybn(bn) {
    return new Promise((res, rej) => {
      db.querySimple("Benutzer", "*", ` Benutzername='${bn}'`)
        .then((user) => {
          res(new userdb(user.rows[0]));
        })
        .catch((err) => {
          rej(err);
        });
    });
  }

  static getbyemail(email) {
    return new Promise((res, rej) => {
      db.querySimple("Benutzer", "*", ` Email='${email}'`)
        .then((user) => {
          console.log(user)
          res(new userdb(user.rows[0]));
        })
        .catch((err) => {
          rej(err);
        });
    });
  }
}

module.exports.userdb = userdb;
