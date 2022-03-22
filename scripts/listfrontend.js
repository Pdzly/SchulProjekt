import { game } from "./util_classes.js";
function imageExists(url, callback) {
  var img = new Image();
  img.onload = function() { callback(true); };
  img.onerror = function() { callback(false); };
  img.src = url;
}

// Sample usage
var imageUrl = 'http://www.google.com/images/srpr/nav_logo14.png';

function doload() {
  game.getallgames().then((val) => {
    let list = document.getElementById("gamelist");
    val.forEach((gam) => {
      let gm = new game(gam);

      gm.parseBilder().then((val) => {
        let item = document.createElement("img");
        item.id = gm.SpielID ?? "ZZZZZZ";

        item.onclick = function () {
          document.location.href = "/game?id=" + gm.SpielID;
        };

        if (gm.bilder && gm.bilder.length > 0 ) {
          imageExists(imageUrl, function(exists) {
            if(exists) {
              item.src = "/img/start/" + gm.bilder[0].URL;
            }else{
              item.src = "/img/kbv.png";
            }
          });
        } else {
          item.src = "/img/kbv.png";
        }
        list.appendChild(item);
      });
    });
  });
}
doload();
