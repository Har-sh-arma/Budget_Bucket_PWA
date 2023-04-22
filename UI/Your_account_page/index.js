let ForwardingURL = localStorage.getItem("ForwardingURL");

let db = null;
let j = 1;

const dbName = "Budget_Bucket";

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

let transaction_list = []

function logout() {
    const request = indexedDB.open(dbName)
    request.onsuccess = (e) =>{
        db = e.target.result;
        const tx = db.transaction("transactions", "readonly");
        const trans = tx.objectStore("transactions");
        var cursorRequest = trans.openCursor();
        cursorRequest.onsuccess = (e) =>{
          const cursor = e.target.result;
          if (cursor) {
            // console.log(cursor.value);
            let t = {session_id:null, date:cursor.value.date,time: cursor.value.time,category: cursor.value.category,amount: cursor.value.amount};
            // transaction_list.append(t);
            console.log(t)
            cursor.continue();
          }
        }
        // alert("success");
    }
    setTimeout(()=>{
        console.log(transaction_list)
        let post_obj = {transactions : transaction_list, email:userEmail}
        axios.put("/logout",post_obj, {
        baseURL: ForwardingURL,
        withCredentials:true
    }).then(res => {
        location.href = "../Login_page/"
      })}, 1000)

}

let userEmail = localStorage.getItem("userEmail")
document.getElementById("emailinp").placeholder = userEmail;



