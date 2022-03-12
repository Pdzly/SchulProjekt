//#region Imports
import {
    game, setgdclass, setgfclass, setggclass, setgpclass, setgtclass,
} from "./util_classes.js"
//#endregion

function loadgame() {
    setgtclass("det-headerbox")
    setggclass("det-genre")
    setgfclass("det-fsk")
    setgpclass("det-platform")
    setgdclass("det-textbox")
    let par = new URLSearchParams(window.location.search)

    let gameid = par.get("id")
    fetch("/api/games/findgame", {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            Id: gameid
        })
    }).then(data => {
        return data.json()
    }).then(data => {
        if (!data.success) return
        let games = data.data.rows
        games.forEach((gm, k) => {
            const gam = new game(gm)
            gam.parseAll().then(val => {
                gam.highlighted()
                console.log(gam)
                if(gam.bilder?.length > 0){
                    document.getElementById("det-img").src = "/img/start/" + gam.bilder[0].URL
                }else{
                    document.getElementById("det-img").src = "/img/kbv.png"
                }
            })
            
        });
    }).catch(err => {
        console.error(err)
    });

}




loadgame()