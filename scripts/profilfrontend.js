import { usermanager } from "./util_classes.js";


function loadprofil(){
    let par = new URLSearchParams(window.location.search)
    let gameid = par.get("id")
    let name = document.getElementById("regname")
    let bname = document.getElementById("bigregname")
    let age = document.getElementById("regage")
    let regdate = document.getElementById("regdate")
    fetch("/api/user/getuser", {
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
        if (!data.data.IsValid) return
        let profile = data.data
        console.log(data)
        name.innerText = profile.Benutzername
        bname.innerText = profile.Benutzername
        age.innerText = profile.Geburtstag || "[ Nicht angegeben ]"
        regdate.innerText = profile.Registrierungsdatum.substring(0, 10);
    }).catch(err => {
        console.error(err)
    });
}

loadprofil()