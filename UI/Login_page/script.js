

let el = document.getElementById("sub");

var user = {};

async function postData(url = "", data = {}) {
  const response = await fetch(url, {
    method: "POST", 
    mode: "cors", 
    cache: "default",
    credentials: "same-origin", 
    headers: {
      "Content-Type": "application/json",
    },
    redirect: "follow",
    referrerPolicy: "no-referrer",
    body: JSON.stringify(data),
  });
  return response.json();
}





el.addEventListener("click", lgin);



function otp() {
  var otpObj = {};
  var otp = document.getElementById("ottp").value;
  user["otp"] = otp;
  axios.post("/signup/verifyOTP", user, {
    baseURL: 'https://cd8e-103-100-17-152.ngrok-free.app',
}).then(res => {
    console.log(res);
  }).catch(err => {
    console.log(err);
  });
  console.log(user);

}

function sup() {

  el.removeEventListener("click", lgin);
  el.addEventListener("click", sgn);
  var div = document.createElement('div');
  div.id = "udiv";
  div.className = "txt_field";
  div.innerHTML = `<input type="text" id = "usrnm"required>
    <span></span>
    <label>Username</label>
    `;

  let form = document.getElementById("frm");
  form.insertBefore(div, document.getElementById("password"));

  document.getElementById("sl").remove();

  document.getElementById("mainh").innerHTML = `Signup`;
  document.getElementById("sub").innerHTML = `Signup`;

  var username = document.getElementById("usrnm");
  var password = document.getElementById("pswd");
  var email = document.getElementById("omk");

  // if (username.value !== "" && password.value !== "" && email.value !== "") {
  //   el.removeEventListener("click", lgin);
  //   el.addEventListener("click", sgn);
  // }
}

function lgin() {

  user = {};
  var email = document.getElementById("omk");
  var password = document.getElementById("pswd");

  user["email"] = email.value;
  user["password"] = password.value;
  user["device_info"] = "";

  axios.post("/login", user, {
    baseURL: 'https://cd8e-103-100-17-152.ngrok-free.app',
}).then(res => {
    console.log(res);
  }).catch(err => {
    console.log(err);
  });

  console.log(user);

}

function sgn() {

  var users = {};
  var username = document.getElementById("usrnm");
  var password = document.getElementById("pswd");
  var email = document.getElementById("omk");

  user["username"] = username.value;
  user["password"] = password.value;
  user["email"] = email.value;

  console.log(username.value);
  console.log(user);

  axios.post("/signup/getOTP", user, {
    baseURL: 'https://cd8e-103-100-17-152.ngrok-free.app',
}).then(res => {
    console.log(res);
  }).catch(err => {
    console.log(err);
  });

  document.getElementById("udiv").remove();
  document.getElementById("password").remove();
  document.getElementById("eml").remove();

  document.getElementById("mainh").innerHTML = `Enter OTP`;
  document.getElementById("sub").innerHTML = `Proceed`;

  var pit = document.createElement('div');
  pit.id = "otp";
  pit.className = "txt_field";
  pit.innerHTML = `<input type="password" id = "ottp" required>
    <span></span>
    <label>OTP</label>
    `;

  var form = document.getElementById("frm");
  form.insertBefore(pit, document.getElementById("sub"));
  el.removeEventListener("click", sgn);
  el.addEventListener("click", otp);

}

if ("serviceWorker" in navigator) {
  navigator.serviceWorker.register("../../sw.js");
}