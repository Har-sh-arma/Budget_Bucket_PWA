let ForwardingURL = localStorage.getItem("ForwardingURL");

validate = () => {
    console.log("inside validate function");

    var email_id = document.getElementById("emailinp").value;
    var name = document.getElementById("nameinp").value;
    var Location = document.getElementById("locationinp").value;
    var dob = document.getElementById("dobinp").value;

    var chk_email = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;



    if ((chk_email.test(email_id)) && (name != "") && (Location != "") && (dob != "")) {

        const obj = {
            "Name": `${name}`,
            "Location": `${Location}`,
            "Email": `${email_id}`,
            "DOB": `${dob}`
        }

        console.log(obj);
        alert("all correct");
        return true;
    }
    else {
        alert("wrong credentials");
        console.log("inside else statement of validate fun");
        return false;
    }

}


let input = document.querySelector('.proinp input');

window.onload = function () {
    var fileupload = document.getElementById("FileUpload1");
    var image = document.getElementById("imgFileUpload");
    image.onclick = function () {
        fileupload.click();
    };
};


input.addEventListener('change', () => {
    const files = input.files;
    // console.log((files));
    document.querySelector('#imgFileUpload').src = URL.createObjectURL(files[0]);
})

function logout() {
    axios.put("/logout",{}, {
        baseURL: ForwardingURL,
        withCredentials:true
    }).then(res => {
        location.href = "../Login_page/"
      })
}

let userEmail = localStorage.getItem("userEmail")
document.getElementById("emailinp").placeholder = userEmail;



