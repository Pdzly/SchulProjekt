const registeredgames = {}
const registeredplatforms = {}
const registeredstudios = {}
const registeredbilder = {}
const registeredfsk = {}
let gl
var gtclass = "ind-headerbox"
export function setgtclass(val){
    gtclass = val
}
let gt
var gdclass = "ind-headerbox"
export function setgdclass(val){
    gdclass = val
}
let gd
var gpclass = "ind-headerbox"
export function setgpclass(val){
    gpclass = val
}
let gp
var gfclass = "ind-headerbox"
export function setgfclass(val){
    gfclass = val
}
let gf
var ggclass = "ind-headerbox"
export function setggclass(val){
    ggclass = val
}
let gg


//#region Usermanager
export class usermanager {
    static checkuser(username, pw) {
        //Dochecking
        return new Promise((res, rej) => {
            res(username + " und passwort " + pw + " ist korrekt")
        })
    }
}
//#endregion

//#region Game
export class game {
    constructor(id, Bezeichnung, BildIDs, StudioID, PlattformID, SPID, Erscheinungsjahr, FSKZiffer, Genres, Kurztext, Plattform, Spielzeit, Studio, StudioURL, URL) {
        if (typeof id === "object") {
            this.SpielID = id.SpielID ?? false
            this.BildIDs = id.BildIDs ?? false
            this.StudioID = id.StudioID ?? false
            this.PlattformID = id.PlattformID ?? false
            this.SPID = id.SPID ?? false
            this.Bezeichnung = id.Bezeichnung ?? false
            this.Erscheinungsjahr = id.Erscheinungsjahr ?? false
            this.FSKZiffer = id.FSKZiffer ?? false
            this.Genres = id.Genres ?? false
            this.Kurztext = id.Kurztext ?? false
            this.Plattform = id.Plattform ?? false
            this.Spielzeit = id.Spielzeit ?? false
            this.Studio = id.Studio ?? false
            this.StudioURL = id.StudioURL ?? false
        } else {
            this.SpielID = SpielID ?? false
            this.Bezeichnung = Bezeichnung ?? false
            this.BildIDs = BildIDs ?? false
            this.StudioID = StudioID ?? false
            this.PlattformID = PlattformID ?? false
            this.SPID = SPID ?? false
            this.Erscheinungsjahr = Erscheinungsjahr ?? false
            this.FSKZiffer = FSKZiffer ?? false
            this.Genres = Genres ?? false
            this.Kurztext = Kurztext ?? false
            this.Plattform = Plattform ?? false
            this.Spielzeit = Spielzeit ?? false
            this.Studio = Studio ?? false
            this.StudioURL = StudioURL ?? false
        }
        if (this.PlattformID && (typeof this.PlattformID === "string" || typeof this.PlattformID === "number")) {
            if (typeof this.PlattformID === "number") {
                this.PlattformID = [this.PlattformID] ?? false
            } else {
                this.PlattformID = this.PlattformID?.split("; ") ?? [this.PlattformID] ?? false
            }
        }
        if (this.Plattform && (typeof this.Plattform === "string" || typeof this.Plattform === "number")) {
            if (typeof this.Plattform === "number") {
                this.Plattform = [this.Plattform] ?? false
            } else {
                this.Plattform = this.Plattform?.split("; ") ?? [this.Plattform] ?? false
            }
        }
        if (this.Genres && (typeof this.Genres === "string" || typeof this.Genres === "number")) {
            if (typeof this.Genres === "number") {
                this.Genres = [this.Genres] ?? false
            } else {
                this.Genres = this.Genres?.split("; ") ?? [this.Genres] ?? false
            }
        }
        if (this.BildIDs && (typeof this.BildIDs === "string" || typeof this.BildIDs === "number")) {
            if (typeof this.BildIDs === "number") {
                this.BildIDs = [this.BildIDs] ?? false
            } else {
                this.BildIDs = this.BildIDs?.split("; ") ?? [this.BildIDs] ?? false
            }
        }
        if (this.StudioID && (typeof this.StudioID === "string" || typeof this.StudioID === "number")) {
            if (typeof this.StudioID === "number") {
                this.StudioID = [this.StudioID] ?? false
            } else {
                this.StudioID = this.StudioID?.split("; ") ?? [this.StudioID] ?? false
            }
        }

        registeredgames[this.SpielID] = this
    }

    getplatforms() {
        return new Promise((res, rej) => {
            const plattforms = []
            if (this.Plattform) {
                this.Plattform.forEach(platt => {
                    plattforms.push(plattform.getplatformbyid(platt.PlattformID))
                })
            } else {
                res(plattforms)
            }
        })
    }

    getbilder() {
        return new Promise((res, rej) => {
            const bilder = []
            if (this.BildIDs) {
                this.BildIDs.forEach(bid => {
                    bilder.push(bild.getBildById(bid))
                })
            } else {
                res(plattforms)
            }
        })
    }

    addtoglide(glideclass) {
        let li = document.createElement("li")
        li.classList.add("glide_slide")

        let img = document.createElement("img")
        img.classList.add("gamepreview")
        img.id = this.SpielID
        if (Array.isArray(this.BildIDs) && this.BildIDs[0]) {
            bild.getBildById(this.BildIDs[0]).then(val => {
                img.src = "/img/start/" + val.URL
            }, er => {
                console.log(er)
            })
        } else {
            img.src = "/img/example.jpg"
        }
        li.appendChild(img)

        if (!gl) {
            gl = document.getElementById(glideclass)
        }
        gl.appendChild(li)
    }

    highlighted() {
        if (!gt) {
            gt = document.getElementById(gtclass)
        }

        if (!gd) {
            gd = document.getElementById(gdclass)
        }

        if (!gp) {
            gp = document.getElementById(gpclass)
        }

        if (!gf) {
            gf = document.getElementById(gfclass)
        }
        if (!gg) {
            gg = document.getElementById(ggclass)
        }
        console.log(this)
        if(gp){
            gp.innerHTML = "[ ]"
        }
        if(gf){
            gf.innerHTML = "[ ]"
        }
        if(gg){
            gg.innerHTML = "[ ]"
        }
        if(gt){
            gt.innerText = this.Bezeichnung || "Kein Titel vorhanden"
        }
        if(gd){
            gd.innerText = this.Kurztext || "Keine Beschreibung vorhanden"
        }
        if (this.plattforms) {
            this.plattforms.forEach(platt => {
                platt.highlight()
            })
        }

        if (this.FSK instanceof fsk ) {
            this.FSK.highlight()
        }

        if (this.Genres && Array.isArray(this.Genres)) {
            gg.innerText = "[ " + this.Genres.join(" ") + " ]"
        }

    }

    print() {
        prettyprint(this, "Game Instanz  -  " + this.Bezeichnung)
    }

    parseAll() {
        return new Promise((res, rej) => {
            let promises = []
            promises[0] = this.parseStudios()
            promises[1] = this.parseGenres()
            promises[2] = this.parseFSK()
            promises[3] = this.parsePlattforms()
            promises[4] = this.parseBilder()
            Promise.all(promises).then(vals => {
                res(vals)
            })
        });

    }

    parseStudios() {
        return new Promise((res, rej) => {
            if (!this.StudioID || typeof this.StudioID === "undefined") {
                res()
                return
            }
            this.studios = []
            const promises = []
            this.StudioID.forEach(stid => {
                promises.insert(0, studio.getstudiobyid(stid).then(studios => {
                    if (studios) {
                        this.studios.insert(0, new studio(studios))
                    }
                }, err => {
                    console.log(err)
                }))
            })
            Promise.all(promises).then(() => {
                res(this.studios)
            })
        })
    }

    parsePlattforms() {
        return new Promise((res, rej) => {
            if (!this.PlattformID || typeof this.PlattformID === "undefined") {
                res()
                return
            }

            this.plattforms = []
            const promises = []
            this.PlattformID.forEach(plattfid => {
                console.log(plattfid)
                promises.insert(0, plattform.getplatformbyid(plattfid).then(platt => {
                    if (platt) {
                        this.plattforms.insert(0, new plattform(platt))
                    }
                }, err => {
                    console.log(err)
                }))

            })
            Promise.all(promises).then(() => {
                res(this.plattforms)
            })
            return
        })
    }

    parseBilder() {
        return new Promise((res, rej) => {
            if (!this.BildIDs || typeof this.BildIDs === "undefined") {
                res()
                return
            }
            this.bilder = []
            const promises = []
            this.BildIDs.forEach(bildid => {
                console.log(bildid)
                promises.insert(0, bild.getBildById(bildid.BildID ?? bildid).then(bld => {
                    console.log(bld)
                    if (bld) {
                        this.bilder.insert(0, new bild(bld))
                    }
                }, err => {
                    console.log(err)
                }))

            })
            Promise.all(promises).then(() => {
                res(this.bilder)
            })
            return
        })
    }

    parseFSK() {
        return new Promise((res, rej) => {
            console.log(typeof this.FSKZiffer)
            if (typeof this.FSKZiffer !== "number") {
                res()
                return
            }

            fsk.getFSKById(this.FSKZiffer).then(nfsk => {
                if (nfsk) {
                    this.FSK = new fsk(nfsk)
                }
                res(this.FSK)
            })
        })
    }

    parseGenres() {
        return new Promise((res, rej) => {
            if (!this.Genres || typeof this.Genres !== "string") {
                res()
                return
            }

            this.Genres = this.Genres.split(";")
        })
    }

    remove() {
        registeredgames[this.SpielID] = undefined
        delete this
    }

    static findgamebyid(id) {
        return new Promise((res, rej) => {
            if (registeredgames[id]) {
                res(registeredgames[id])
            } else {
                fetch("/api/games/findgame", {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({
                        Id: id
                    })
                }).then(data => {
                    return data.json()
                }).then(data => {
                    if (!data.success) return
                    let games = data.data.rows
                    if (games[0]) {
                        const gam = new game(games[0])
                        res(gam)
                    } else {
                        throw "Keine Spiele gefunden!"
                    }
                }).catch(err => {
                    console.error(err)
                    rej(err)
                });
            }
        })

    }

    static findgamebyname(name) {
        let game = registeredgames.find(dat => {
            return dat.Bezeichnung == name
        })
        if (game) {
            return game
        } else {
            fetch("/api/games/findgame", {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    Bezeichnung: name
                })
            }).then(data => {
                return data.json()
            }).then(data => {
                if (!data.success) return
                games = data.data.rows
                if (gm[0]) {
                    const gam = new game(gm[0])
                    return gam
                } else {
                    throw "Keine Spiele gefunden!"
                }
            }).catch(err => {
                console.error(err)
                rej(err)
            });
        }
    }

}
//#endregion

//#region plattform
export class plattform {
    constructor(PlattformID, Bezeichnung, BildURL) {
        if (typeof PlattformID === "object") {
            this.PlattformID = PlattformID.PlattformID ?? false
            this.Bezeichnung = PlattformID.Bezeichnung ?? false
            this.BildURL = PlattformID.BildURL ?? false
        } else {
            this.PlattformID = PlattformID ?? false
            this.Bezeichnung = Bezeichnung ?? false
            this.BildURL = BildURL ?? false
        }
        if (this.BildURL && !this.BildURL.startsWith("/img/plattform/")) {
            this.BildURL = "/img/plattform/" + this.BildURL
        }
        registeredplatforms[this.PlattformID] = this
    }

    remove() {
        registeredplatforms[this.PlattformID] = undefined
        delete this
    }

    highlight() {
        if (!gp) {
            gp = document.getElementById(gpclass)
        }
        let txt = gp.innerText.split(" ")
        txt.insert(1, this.Bezeichnung)
        gp.innerText = txt.join(" ")
    }

    static getplatformbyid(id) {
        return new Promise((res, rej) => {
            console.log(id)
            if (!id) {
                res()
            }
            const plat = registeredplatforms[id]
            if (plat) {
                res(plat)
            } else {
                fetch("/api/games/findplattform", {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({
                        Id: id
                    })
                }).then(data => {
                    return data.json()
                }).then(data => {
                    if (data.success) {
                        if (data.data.rows[0]) {
                            res(new plattform(data.data.rows[0]))
                            return
                        } else {
                            rej("Keine Plattform gefunden!")
                        }
                    } else {
                        rej("Keine Plattform gefunden!")
                    }
                })
            }
        })
    }

    static getplatformbyName(name) {
        return new Promise((res, rej) => {
            const plat = registeredplatforms.find(obj => {
                return obj.Bezeichnung === name
            })
            if (plat) {
                res(plat)
            } else {
                fetch("/api/games/findplattform", {
                    method: "POST",
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({
                        Bezeichnung: name
                    })
                }).then(data => {
                    return data.json()
                }).then(data => {
                    if (data.success) {
                        res(new plattform(data.data.rows[0]))
                    } else {
                        rej("Keine Plattform gefunden!")
                    }
                })
            }
        })

    }
}
//#endregion

//#region Studio
export class studio {
    constructor(StudioID, Bezeichnung, StudioURL) {
        if (typeof StudioID === "object") {
            this.StudioID = StudioID.StudioID ?? false
            this.Bezeichnung = StudioID.Bezeichnung ?? false
            this.StudioURL = StudioID.StudioURL ?? false
        } else {
            this.StudioID = StudioID ?? false
            this.Bezeichnung = Bezeichnung ?? false
            this.StudioURL = StudioURL ?? false
        }
        registeredstudios[this.StudioID] = this
    }
    remove() {
        registeredstudios[this.StudioID] = undefined
        delete this
    }

    static getstudiobyid(id) {
        return new Promise((res, rej) => {
            if (!id) {
                res()
            }
            const plat = registeredstudios[id]
            if (plat) {
                res(plat)
            } else {
                fetch("/api/games/findstudio", {
                    method: "POST",
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({
                        Id: id
                    })
                }).then(data => {
                    return data.json()
                }).then(data => {

                    if (data.success) {
                        res(new studio(data.data.rows[0]))
                    } else {
                        rej("Kein Studio gefunden!")
                    }
                })
            }
        })
    }

    static getstudiobyname(name) {
        return new Promise((res, rej) => {
            const plat = registeredstudios.find(obj => {
                return obj.Bezeichnung === name
            })
            if (plat) {
                res(plat)
            } else {
                fetch("/api/games/findstudio", {
                    method: "POST",
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({
                        Bezeichnung: name
                    })
                }).then(data => {
                    return data.json()
                }).then(data => {
                    if (data.success) {
                        res(new studio(data.data.rows[0]))
                    } else {
                        rej("Kein Studio gefunden!")
                    }
                })
            }
        })

    }
}
//#endregion

//#region Bild
export class bild {
    constructor(BildID, Spiel, URL, BildGroesse) {
        if (typeof BildID === "object") {
            this.BildID = BildID.BildID ?? false
            this.Spiel = BildID.Spiel ?? false
            this.URL = BildID.URL ?? false
            this.BildGroesse = BildID.BildGroesse ?? false
        } else {
            this.BildID = BildID ?? false
            this.Spiel = Spiel ?? false
            this.URL = URL ?? false
            this.BildGroesse = BildGroesse ?? false
        }
        registeredbilder[this.BildID] = this
    }
    remove() {
        registeredbilder[this.BildID] = undefined
        delete this
    }

    static getBildById(id) {
        return new Promise((res, rej) => {
            if (!id) {
                res()
            }
            const plat = registeredbilder[id]
            if (plat) {
                res(plat)
            } else {
                fetch("/api/games/findbild", {
                    method: "POST",
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({
                        Id: id
                    })
                }).then(data => {
                    return data.json()
                }).then(data => {
                    if (data.success) {

                        res(new bild(data.data.rows[0]))
                    } else {
                        rej("Kein Bild gefunden!")
                    }
                })
            }
        })
    }

    static getBildByGame(name) {
        return new Promise((res, rej) => {
            const plat = registeredstudios.find(obj => {
                return obj.Bezeichnung === name
            })
            if (plat) {
                res(plat)
            } else {
                fetch("/api/games/findbild", {
                    method: "POST",
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({
                        Spiel: name
                    })
                }).then(data => {
                    return data.json()
                }).then(data => {
                    if (data.success) {
                        new bild(data.data.rows[0])
                        res(data.data.rows[0])
                    } else {
                        rej("Kein Bild gefunden!")
                    }
                })
            }
        })

    }
}
//#endregion

//#region FSK
export class fsk {
    constructor(FSKID, FSKText, FSKZiffer) {
        if (typeof FSKID === "object") {
            this.FSKID = FSKID.FSKID ?? false
            this.FSKZiffer = FSKID.FSKZiffer ?? FSKID.FSKID ?? false
            this.FSKText = FSKID.FSKText ?? false
        } else {
            this.FSKID = FSKID ?? false
            this.FSKZiffer = FSKZiffer ?? FSKID ?? false
            this.FSKText = FSKText ?? false
        }

        switch (this.FSKID) {
            case 18:
                this.FSKColor = "#FF0000"
                break;
            case 16:
                this.FSKColor = "#FF8900"
                break;
            case 12:
                this.FSKColor = "#FFE800"
                break;
            case 6:
                this.FSKColor = "#00F8FF"
                break;
            case 0:
                this.FSKColor = "#C4C4C4"
                break;
            default:
                this.FSKColor = "#FFFFFF"
        }


        registeredfsk[this.FSKID] = this
    }
    remove() {
        registeredfsk[this.FSKID] = undefined
        delete this
    }
    highlight() {
        gf.innerText = "[ " + this.FSKText + " ]"
    }

    static getFSKById(id) {
        console.log(id)
        return new Promise((res, rej) => {
            const ffsk = registeredfsk[id]
            if (ffsk) {
                res(ffsk)
            } else {
                fetch("/api/games/findFSK", {
                    method: "POST",
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({
                        Id: id
                    })
                }).then(data => {
                    return data.json()
                }).then(data => {
                    console.log(data)
                    if (data.success) {
                        res(new fsk(data.data.rows[0]))
                    } else {
                        rej("Kein FSK gefunden!")
                    }
                })
            }
        })
    }
}
//#endregion

//#region Loading

export class LoadBar {
    constructor(loadingbarid, loadinglabelid, min, max) {
        this.lbid = loadingbarid
        this.loadingbar = document.getElementById(this.lbid)
        if (!this.loadingbar) {
            throw new Error("Es gibt die Loadingbar ID nicht")
        }
        this.llid = loadinglabelid
        this.loadinglabel = document.getElementById(this.llid)
        this.min = min
        this.max = max
        this.percent = 0
        this.applychanges()
    }

    setmax(newmax) {
        this.max = newmax
        this.applychanges()
    }

    setpercent(newper) {
        if (newper > this.max) {
            this.percent = this.max
        } else {
            this.percent = newper
        }
        this.percent = newper
        this.applychanges()
    }

    addpercent(addper) {
        this.percent = this.percent + addper
        this.applychanges()
    }

    applychanges() {
        if (this.loadinglabel) {
            this.loadinglabel.innerText = (this.percent / this.max) * 100 + "%"
        }
        if (this.loadingbar) {
            this.loadingbar.style.width = (this.percent / this.max) * 100 + "%"
            this.loadingbar.setAttribute("aria-valuemin", this.min)
            this.loadingbar.setAttribute("aria-valuemax", this.max)
            this.loadingbar.setAttribute("aria-valuenow", this.percent / this.max)
        }
    }
}
//aria-valuenow="0" aria-valuemin="0" aria-valuemax="100"
//#endregion

//#region Utils

String.prototype.hash = function (seed = 0) {
    let h1 = 0xdeadbeef ^ seed,
        h2 = 0x41c6ce57 ^ seed;
    for (let i = 0, ch; i < this.length; i++) {
        ch = this.charCodeAt(i);
        h1 = Math.imul(h1 ^ ch, 2654435761);
        h2 = Math.imul(h2 ^ ch, 1597334677);
    }
    h1 = Math.imul(h1 ^ (h1 >>> 16), 2246822507) ^ Math.imul(h2 ^ (h2 >>> 13), 3266489909);
    h2 = Math.imul(h2 ^ (h2 >>> 16), 2246822507) ^ Math.imul(h1 ^ (h1 >>> 13), 3266489909);
    return 4294967296 * (2097151 & h2) + (h1 >>> 0);
};


export function prettyprint(obj, name) {
    console.groupCollapsed(name ?? "Pretty Print")
    for (const [key, value] of Object.entries(obj)) {
        console.log(`${key}: ${value}`)
    }
    console.log(obj)
    console.groupEnd()
}

export function getStyleSheet(unique_title) {
    for (const sheet of document.styleSheets) {
        if (sheet.title === unique_title) {
            return sheet;
        }
    }
}

Array.prototype.insert = function (index, item) {
    this.splice(index, 0, item);
};
//#endregion