const cache = {} 
class userdb {
    constructor(BenutzerId, Benutzername, Passwort, EMailAdresse, Geburtsdatum, Registrierungsdatum) {
        if(typeof BenutzerId.Benutzername === "undefined" && typeof Benutzername === "undefined" ){
            throw Error("Benutzername wird benötigt")
        }
        if (typeof BenutzerId === "object") {
            this.BenutzerId = BenutzerId.BenutzerId
            this.Benutzername = BenutzerId.Benutzername
            this.Passwort = BenutzerId.Passwort
            this.EMailAdresse = BenutzerId.EMailAdresse
            this.Geburtsdatum = BenutzerId.Geburtsdatum
            this.Registrierungsdatum = BenutzerId.Registrierungsdatum
        } else {
            this.BenutzerId = BenutzerId
            this.Benutzername = Benutzername
            this.Passwort = Passwort
            this.EMailAdresse = EMailAdresse
            this.Geburtsdatum = Geburtsdatum,
            this.Registrierungsdatum = Registrierungsdatum
        }
    }

    clean(){
        let obj = Object.assign({}, this)
        obj.Passwort = null
        return(obj); 
    }

    save() {
        return new Promise((res, rej) => {
            db.querycomplex(`INSERT INTO Benutzer VALUES("${this.Id}", "${this.Benutzername}", "${this.Passwort}", "${this.Email}", "${this.Registrierungsdatum}") ON DUPLICATE KEY UPDATE "Id"=VALUES("Id"), "Benutzername"=VALUES("Benutzername"), "Passwort"=VALUES("Passwort"), "Email"=VALUES("Email"), "Registrierungsdatum"=VALUES("Registrierungsdatum");`).then(data => {
                res(true)
            }).catch(err => {
                rej(err)
            })
        })
    }

    static getall() {
        return new Promise((res, rej) => {
            db.querySimple("Benutzer").then(users => {
                res(users.rows)

            }).catch(err => {
                rej(err)
            })
        })
    }

    static getbyid(id){
        return new Promise((res, rej) => {
            db.querySimple("Benutzer", "*", ` BenutzerId=${id}` ).then(user => {
                res(new userdb(user.rows[0]))
            }).catch(err => {
                console.log(err)
                rej(err)
            })
        })
    }

    static getbybn(bn){
        return new Promise((res, rej) => {
            db.querySimple("Benutzer", "*", ` Benutzername=${bn}` ).then(user => {
                res(new userdb(user.rows[0]))
            }).catch(err => {
                rej(err)
            })
        })
    }

    static getbyemail(email){
        return new Promise((res, rej) => {
            db.querySimple("Benutzer", "*", ` EMailAdresse=${bn}` ).then(user => {
                res(new userdb(user.rows[0]))
            }).catch(err => {
                rej(err)
            })
        })
    }
}

module.exports.userdb = userdb