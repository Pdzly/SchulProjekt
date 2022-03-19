//#region Imports
import {
  game,
  LoadBar,
  setgdclass,
  setgfclass,
  setggclass,
  setgpclass,
  setgtclass,
} from "./util_classes.js";
//#endregion

//#region Declarations
let gl;

var glider = null;
var games = [];

const glideropts = {
  breakpoints: {
    1700: {
      perView: 2,
      peek: 50,
      gap: 100,
    },
    1250: {
      perView: 1,
      peek: 25,
      gap: 150,
    },
    750: {
      perView: 1,
      gap: 250,
    },
  },
  type: "carousel",
  startAt: 0,
  perView: 3,
  peek: 100,
  gap: 50,
  animationDuration: 800,
  animationTimingFunc: "ease",
  hoverpause: false,
  perTouch: 3,
  focusAt: "center",
};
//#endregion

//#region Main
function testuser() {
  let test = JSON.stringify({
    Id: 1,
  });
  fetch("/api/user/getuser", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: test,
  })
    .then((data) => {
      return data.json();
    })
    .then((data) => {
      console.log(data);
    });
}

function dohighlight() {
  let activegame = document.querySelector(".glide__slide--active > img");
  if (!activegame) return;
  game.findgamebyid(activegame.id).then((gameinst) => {
    if (gameinst) {
      gameinst.highlighted();
    }
  });
}

function loadgames() {
  setgtclass("ind-headerbox");
  setggclass("ind-genre");
  setgfclass("ind-fsk");
  setgpclass("ind-platform");
  setgdclass("ind-textbox");

  glider = new Glide(".glide", glideropts);

  glider.on(["swipe.end", "run.after", "build.after"], function () {
    dohighlight();
  });
  const loadbar = new LoadBar("loadingbar", "loadingbar", 0, 26);
  fetch("/api/games/findgame", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      Id: "145",
    }),
  })
    .then((data) => {
      return data.json();
    })
    .then((data) => {
      if (!data.success) return;
      games = data.data.rows;
      games.forEach((gm, k) => {
        const gam = new game(gm);
        loadbar.addpercent(1);
        gam.parseAll().then((val) => {
          gam.addtoglide("slides");
        });
      });
      fetch("/api/games/gethighlights")
        .then((data) => {
          return data.json();
        })
        .then((data) => {
          games = data.data.rows;
          games.forEach((gm, k) => {
            const gam = new game(gm);
            loadbar.addpercent(1);
            gam.parseAll().then((val) => {
              gam.addtoglide("slides");
            });
          });
          setTimeout(() => {
            glider.mount();

            document.getElementById("ind-loaderdiv").remove();
          }, 2000);
        })
        .catch((err) => {
          console.error(err);
        });
    })
    .catch((err) => {
      console.error(err);
    });
}
/*
      setTimeout(() => {
                document.getElementById("ind-loaderdiv").remove()
            }, 2500);
*/
function domove(move) {
  if (glider != null) {
    glider.go(move);
  }
}

window.domove = domove;
//#endregion

//#region To-Do
function opendetails() {}
window.opendetails = opendetails;
//#endregion

document.onresize = function(ev) {
    glider.mount();
}

//#region Init
loadgames();
//testuser()
//#endregion
