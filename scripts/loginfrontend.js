import { usermanager } from "./util_classes.js";

let username, password, save;

function dologin() {
  if (!username) {
    username = document.getElementById("bnn");
  }
  if (!password) {
    password = document.getElementById("pwd");
  }
  if (!save) {
    save = document.getElementById("login-save");
  }
  usermanager
    .checkuser(username.value, password.value)
    .then((res) => {
      if (res.correct) {
        console.log(res);
        if (save.checked) {
          usermanager.savelocaluser(res.data)
        }else{
          sessionStorage.setItem('gametroopiaaccess', res.data.accesstoken)
          sessionStorage.setItem('gametroopiabenutzername', res.data.Benutzername)
          console.log(sessionStorage.getItem('gametroopiaaccess'))
          console.log(sessionStorage.getItem('gametroopiabenutzername'))
        }
        //document.location.href = "/"
      }
    })
    .catch((err) => {
      console.log(err);
    });
}

window.dologin = dologin;
