var glider = null

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
function loaddata(gld) {
    glider = new Glide(".glide", glideropts).mount()
}

function domove(move){
    if(glider != null){
        glider.go(move)
    }
}

function opendetails(){
    
}

document.onresize = function(ev){
    glider = new Glide(".glide", glideropts).mount()
}