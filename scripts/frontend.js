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
            perView: 3,
            peek: 150,
        },
        1000: {
            perView: 2,
            peek: 100,
        },
        500: {
            perView: 1,
            peek: 0,

        }
    },
    type: 'carousel',
    startAt: 0,
    perView: 5,
    peek: 250,
    animationDuration: 800,
    animationTimingFunc: "ease",
    hoverpause: false,
    perTouch: 3,
    focusAt: 'center',
}
//#endregion

//#region Main

function addgame(data) {
    let li = document.createElement("li")
    li.classList.add("glide_slide")

    let img = document.createElement("img")
    img.classList.add("gamepreview")
    if (data.URL != null) {
        img.src = "/img/start/" + data.URL
    } else {
        img.src = "/img/example.jpg"
    }
    li.appendChild(img)

    if (!gl) {
        gl = document.getElementById("slides")
    }
    gl.appendChild(li)
}

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

function loadgames() {
    fetch("/api/games/getgames").then(data => {
        return data.json()
    }).then(data => {
        games = data.data.rows
        games.forEach((gm, k) => {
            const gam = new game(gm)
            gam.print()
            addgame(gam)
        });
        glider = new Glide(".glide", glideropts).mount()

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