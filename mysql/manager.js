const mysql = require('mysql');
const { userdb } = require('../mysql/userdb');
const con = mysql.createConnection({
    host: '5.104.107.59',
    user: 'gametopia_user',
    password: '#1742Dad123#',
    database: 'GameTopia',
    insecureAuth: false,
    port: "3306",
    supportBigNumbers: true
});

if (!String.format) {
    String.format = function (format) {
        var args = Array.prototype.slice.call(arguments, 1);
        return format.replace(/{(\d+)}/g, function (match, number) {
            return typeof args[number] != 'undefined' ?
                args[number] :
                match;
        });
    };
}

let db = {
    connect: function () {
        con.connect(err => {
            if (err) {
                console.log(err)
                if (err.fatal) {
                    return false
                }
            }
            console.log("Erfolgreich Verbunden")
        })
    },
    querySimple: function (table, select, where) {
        return new Promise(function (resolve, reject) {
            if(con.state === 'disconnected'){
                reject("Datenbankverbindungs wurde unterbrochen")
              }
            if (!table) {
                throw "Ein Table ist notwendig!"
            }
            if (!select) {
                select = "*"
            }
            if (!where) {
                where = ""
            } else {
                where = "WHERE " + where
            }
            let sql = String.format("SELECT {0} FROM {1} {2}", select, table, where)
            return con.query(sql, function (err, rows, fields) {
                // Call reject on error states,
                // call resolve with results
                if (err) {
                    return reject(err);
                }
                resolve({ rows: rows, fields: fields });
            });
        })
    },
    querycomplex: function (querystring) {
        return new Promise(function (resolve, reject) {
            if(con.state === 'disconnected'){
                reject("Datenbankverbindungs wurde unterbrochen")
              }
            let sql = querystring
            return con.query(sql, function (err, rows, fields) {
                // Call reject on error states,
                // call resolve with results
                if (err) {
                    return reject(err);
                }
                resolve({ rows: rows, fields: fields });
            });
        })
    }
}

module.exports = db