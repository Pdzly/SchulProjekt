import { usermanager } from "./util_classes.js";

let username, password, email;

function doregister() {
  if (!email) {
    email = document.getElementById("email");
  }

  if (!username) {
    username = document.getElementById("bnn");
  }

  if (!password) {
    password = document.getElementById("pwd");
  }
  console.log(email.value);
  console.log(username.value);
  console.log(password.value);
  usermanager
    .createuser(email.value, username.value, password.value)
    .then((res) => {
      console.log(res);
      if(!res.success){
        console.error(res.message)
      }else{
        document.location.href = "/login"
      }
    })
    .catch((err) => {
      console.log(err);
    });
}

window.doregister = doregister;
