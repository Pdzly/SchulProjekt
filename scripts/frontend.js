var glider = null
var games = []
var glideropts = {
    breakpoints: {
        1700: {
            perView: 2,
            peek: 150,
        },
        1000: {
            perView: 1,
            peek: 100,
        },
        500: {
            perView: 1,
            peek: 0,

        }
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
let gl

//<li class="glide__slide">
function addgame(key, data) {
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
BreakException = {}

function loadgames() {

    fetch("/api/games/getgames").then(data => {
        return data.json()
    }).then(data => {
        games = data[0].data.rows
        try {
            games.forEach((game, k) => {
                console.log(game)
                console.log(k)
                addgame(k, game)
            });
            glider = new Glide(".glide", glideropts).mount()

        } catch (e) {
            if (e !== BreakException) throw e;
        }
    });

}

function loaddata(gld) {
    loadgames()
}

function domove(move) {
    if (glider != null) {
        glider.go(move)
    }
}

function opendetails() {

}
/*
document.onresize = function (ev) {
    glider.mount()
}
*/