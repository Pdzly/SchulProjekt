//#region Imports
import {
    game
} from "./util_classes.js"
//#endregion

//#region Declarations
let gl

var glider = null
var games = []

const glideropts = {
    breakpoints: {
        1700: {
            perView: 2,
            peek: 150,
        },
        1000: {
            perView: 1,
            peek: 50,
        },
    },
    type: 'carousel',
    startAt: 0,
    perView: 4,
    peek: 250,
    animationDuration: 800,
    animationTimingFunc: "ease",
    hoverpause: false,
    perTouch: 3,
    focusAt: 'center',
}
//#endregion

//#region Main
function testuser() {
    let test = JSON.stringify({
        Id: 1
    })
    fetch("/api/user/getuser", {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: test
    }).then(data => {
        return data.json()
    }).then(data => {
        console.log(data)
    })
}

function dohighlight() {
    let activegame = document.querySelector(".glide__slide--active > img")
    if (!activegame) return
    let gameinst = game.findgamebyid(activegame.id)
    if (gameinst) {
        gameinst.highlighted()
    }
}

function loadgames() {
    fetch("/api/games/findgame", {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            Id: "26"
        })
    }).then(data => {
        return data.json()
    }).then(data => {
        if(!data.success) return
        console.log(data)
        games = data.data.rows
        games.forEach((gm, k) => {
            const gam = new game(gm)
            gam.print()
            gam.addtoglide("slides")
        });
    }).catch(err => {
        console.error(err)
    });
    fetch("/api/games/gethighlights").then(data => {
        return data.json()
    }).then(data => {
        console.log(data)
        games = data.data.rows
        games.forEach((gm, k) => {
            const gam = new game(gm)
            gam.print()
            gam.addtoglide("slides")
        });
        glider = new Glide(".glide", glideropts)
        glider.on(['swipe.end', 'run.after'], function () {
            dohighlight()
        })
        glider.on(['build.after'], function () {
            dohighlight()
        })
        glider.mount()
    }).catch(err => {
        console.error(err)
    });

}

function domove(move) {
    if (glider != null) {
        glider.go(move)
    }
}

window.domove = domove
//#endregion

//#region To-Do
function opendetails() {

}
//#endregion


//#region Init
loadgames()
testuser()
//#endregion