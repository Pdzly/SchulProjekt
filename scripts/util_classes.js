const registeredgames = {}
const registeredplatforms = {}
const registeredstudios = {}
let gl
const gtclass = "ind-gametitle"
let gt
const gdclass = "ind-gamedesc"
let gd
const gpclass = "ind-gameplatforms"
let gp
//#region Game
export class game {
    constructor(id, Bezeichnung, BildID, StudioID, PlattformID, SPID, Erscheinungsjahr, FSKZiffer, Genres, Kurztext, Plattform, Spielzeit, Studio, StudioURL, URL) {
        if (typeof id === "object") {
            this.SpielID = id.SpielID ?? false
            this.BildID = id.BildID ?? false
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
            this.URL = id.URL ?? false
        } else {
            this.SpielID = SpielID ?? false
            this.Bezeichnung = Bezeichnung ?? false
            this.BildID = BildID ?? false
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
            this.URL = URL ?? false
        }
        if (this.PlattformID) {
            this.PlattformID = this.PlattformID?.split("; ") ?? false

        }
        if (this.Plattform) {
            this.Plattform = this.Plattform?.split("; ") ?? false
        }
        if (this.Genres) {
            this.Genres = this.Genres?.split("; ") ?? false
        }
        registeredgames[this.SpielID] = this
    }

    getplatforms() {
        return new Promise((res, rej) => {
            const plattforms = []
            if (this.Plattform) {
                plattform.getplatformbyid()
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
        if (this.URL) {
            img.src = "/img/start/" + this.URL
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

        gp.innerHTML = ""

        gt.innerText = this.Bezeichnung || "Kein Titel vorhanden"
        gd.innerText = this.Kurztext || "Keine Beschreibung vorhanden"
        if (this.plattforms) {
  
            this.plattforms.forEach(platt => {
                platt.highlight()
            })
        }
    }

    print() {
        prettyprint(this, "Game Instanz  -  " + this.Bezeichnung)
    }

    parseplattforms() {
        return new Promise((res, rej) => {
            if (!this.PlattformID || typeof this.PlattformID === "undefined") {
                rej("PlattformID ist kein Array")
                return
            }

            this.plattforms = []
            const promises = []
            this.PlattformID.forEach(plattfid => {
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

    remove() {
        registeredgames[this.SpielID] = undefined
        delete this
    }

    static findgamebyid(id) {
        if (registeredgames[id]) {
            return registeredgames[id]
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
        if (this.BildURL && !this.BildURL.startsWith("/plattform/")) {
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
        if (document.getElementById(this.PlattformID)) {
            return
        }
        const img = document.createElement("img")
        img.classList.add("plattformicon")
        img.id = this.PlattformID
        img.src = this.BildURL

        gp.appendChild(img)
    }

    static getplatformbyid(id) {
        return new Promise((res, rej) => {
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
                            new plattform(data.data.rows[0])
                            res(data.data.rows[0])
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
                    body: JSON.stringify({
                        Bezeichnung: name
                    })
                }).then(data => {
                    return data.json()
                }).then(data => {
                    if (data.success) {
                        res(data.data)
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
            const plat = registeredstudios[id]
            if (plat) {
                res(plat)
            } else {
                fetch("/api/games/findstudio", {
                    method: "POST",
                    body: JSON.stringify({
                        Id: id
                    })
                }).then(data => {
                    return data.json()
                }).then(data => {
                    if (data.success) {
                        res(data.data)
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
                    body: JSON.stringify({
                        Bezeichnung: name
                    })
                }).then(data => {
                    return data.json()
                }).then(data => {
                    if (data.success) {
                        res(data.data)
                    } else {
                        rej("Kein Studio gefunden!")
                    }
                })
            }
        })

    }
}
//#endregion

//#region Utils
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