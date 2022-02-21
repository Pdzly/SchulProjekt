//#region Imports
import {
    game,
    LoadBar
} from "./util_classes.js"
//#endregion

var glider = null

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

function loadgame(){
    glider = new Glide(".glide", glideropts)
 
    const params = new URLSearchParams(window.location.search)
    let gameid = params.get("id")
    game.findgamebyid(gameid)
}




loadgame()