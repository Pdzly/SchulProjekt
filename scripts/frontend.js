var glider = null
function loaddata(gld) {
    console.log("inside")
    glider = new Glide(".glide", {
        breakpoints: {
            1.536: {
                perView: 3
            },
            1024: {
                perView: 2
            },
            512: {
                perView: 1
            }
        },
        type: 'carousel',
        startAt: 0,
        perView: 3,
        peek: 50,
        animationDuration: 800,
        animationTimingFunc: "ease",
        hoverpause: false,
        perTouch: 3,
        focusAt: 'center',
    }).mount()
}

function domove(move){
    if(glider != null){
        glider.go(move)
    }
}