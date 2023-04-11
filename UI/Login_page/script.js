otp_hash = "";

let el = document.getElementById("sub");
var username = document.getElementById("usrnm");
var password = document.getElementById("pswd");
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

const hashBrowser = val =>
  crypto.subtle.digest('SHA-256', new TextEncoder('utf-8').encode(val))
    .then(h => {
      let hexes = [],
        view = new DataView(h);
      for (let i = 0; i < view.byteLength; i += 4)
        hexes.push(('00000000' + view.getUint32(i).toString(16)).slice(-8));
      return hexes.join('');
    });

const validate_otp = async (otp, hsh) => {
  let b = await hashBrowser(otp);
  if (b == hsh) {
    console.log("VALID");
    return (true);
  }
  return false;
}

function otp() {
  var otpObj = {};
  var otp = document.getElementById("ottp").value;
  user["otp"] = otp;
  console.log(user);
  if (validate_otp(otp, otp_hash)) {
    // var xhr = new XMLHttpRequest();
    // xhr.open("POST", "http://localhost:5050/signup/verifyOTP", true);
    // xhr.setRequestHeader('Content-Type', 'application/json');
    // xhr.send(JSON.stringify(user));'
    postData("http://localhost:5050/signup/verifyOTP", user).then((data) => {
  console.log(data);
});
  }
  else {
    console.log("OTP assumed to be incorrect");
  }
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

  var xhr = new XMLHttpRequest();
  xhr.open("POST", "http://localhost:5050/login", true);
  xhr.setRequestHeader('Content-Type', 'application/json');
  xhr.onreadystatechange = () => {
    if (xhr.readyState === 4) {
      console.log(xhr.response);
      user_server = xhr.response;
    }
  }

  xhr.send(JSON.stringify(user));

  console.log(user);

}

function sgn() {
  var user = {};
  var username = document.getElementById("usrnm");
  var password = document.getElementById("pswd");
  var email = document.getElementById("omk");

  user["username"] = username.value;
  user["password"] = password.value;
  user["email"] = email.value;
  // var xhr = new XMLHttpRequest();
  // xhr.open("POST", "http://localhost:5050/signup/getOTP", true);
  // xhr.setRequestHeader('Content-Type', 'application/json');
  // xhr.onreadystatechange = () => {
  //   if (xhr.readyState === 4) {
  //     console.log(xhr.response);
  //     otp_hash = xhr.response["hash"];
  //   }
  // }
  // xhr.send(JSON.stringify(user));

  postData("http://127.0.0.1:5050/signup/getOTP", user).then((data) => {
    console.log(data);
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

  console.log(user);
}

if ("serviceWorker" in navigator) {
  navigator.serviceWorker.register("../../sw.js");
}
