import { usermanager } from "./util_classes.js"

let username, password, email

function doregister(){
    if(!email){
        email = document.getElementById("email")
    }

    if(!username){
        username = document.getElementById("bnn")
    }

    if(!password){
        password = document.getElementById("pwd")
    }
    console.log(username.value)
    console.log(password.value)
    usermanager.checkuser(username.value, password.value.hash()).then(res => {console.log(res)}).catch(err => {
        console.log(err)
    })

}

window.doregister = doregister