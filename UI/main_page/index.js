
var flag = 0;
let db = null;
let category = ""
function show_nb() {
    let x = document.getElementsByClassName('nav_bar');
    x[0].classList.toggle('active');
}

if (localStorage.getItem("budget")===null) {
    localStorage.setItem("spent", 0)
    localStorage.setItem("budget",0)
    localStorage.setItem("set_budget",0)
}
if (localStorage.getItem("lstring")===null){
    localStorage.setItem("lstring", 'Transport Food Entertainment Utilities miscellaneous')
    localStorage.setItem("extra",0)
    localStorage.setItem("budget",0)
} 
let budget = Number(localStorage.getItem("budget"));
let spent = Number(localStorage.getItem("spent"));

lstring = localStorage.getItem("lstring")

// script for animation
{let progressBar = document.querySelector(".circular-progress");
let valueContainer = document.querySelector(".value-container");

let progressValue = 0;
let progressEndValue = 100;
let speed = 5;

let max = Math.max(budget, 1);
let sspent = Math.max(spent, 0.7)
let left = max - spent;

let prog = (sspent / max) * 100;

let progress = setInterval(() => {
    progressValue++;
    var col = "#6200ff";
    if (progressValue > 25) {
        col = "#00ff08";
    }
    if (progressValue > 50) {
        col = "#ffdd00";
    }
    if (progressValue > 75) {
        col = "#ff8c00";
    }
    if (progressValue > 85) {
        col = "#d90909";
    }
    // valueContainer.textContent = ``;
    progressBar.style.background = `conic-gradient(
        ${col} ${Math.ceil(progressValue) * 3.6}deg,
        #B1B1B1 ${Math.ceil(progressValue) * 3.6}deg
  )`;
    if (progressValue == Math.ceil(prog)) {
        clearInterval(progress);
    }
}, speed);

// script for animation ends
}

// integration with main page

cat_list = lstring.split(" ");

function display_but() {

    let parent = document.getElementsByClassName("but_cont")[0];
    for (i in cat_list) {
        let e = document.createElement('button');
        e.id = cat_list[i];
        e.onclick = function () {
            category = this.id;
        };
        e.onfocus = function () {
            if (flag === 0) {
                this.style.background = "black";
                this.style.color = "white";
                flag = 1;
            }
        }

        e.onblur = function () {
            this.style.background = "white";
            this.style.color = "black";

            flag = 0;
        }
        e.innerHTML = cat_list[i];
        e.className = "catbut";
        parent.appendChild(e);
        // console.log(`${i}`);
    }
}

display_but();




function add_amount() {
    if(localStorage.getItem("set_budget")==="0"){alert("Set a Budget first ");window.location.href = "../Budget_page";return;}
    if (category != "") {

        let date = new Date();
        let month = date.getMonth();
        month++;
        let fulldate = date.getFullYear()+ "-" + month + "-" +date.getDate();
        let fulltime = date.getHours() + ":" + date.getMinutes() + ":" + date.getSeconds();
        let amount = document.getElementById("aip");
        transaction = {
            date: fulldate,
            time: fulltime,
            category: category,
            amount: amount.value
        }
        console.log(transaction);
        console.log(db);
        // budget.spendings[date_time] = transaction;
        spent+=Number(amount.value);
        localStorage.setItem("spent", spent)

        const tx = db.transaction("transactions", "readwrite");
        const trans = tx.objectStore("transactions");
        trans.add(transaction)
        category = "";
    }
    else {
        alert("select the category first!!!");
    }

    // console.log(budget.spendings);

    flag = 0;

    for (i in budget.categories) {
        document.getElementsByClassName("catbut")[i].style.background = "white";
    }
    window.location.reload()
    document.getElementById("aip").value = "";
}

function add() {

    const div = document.createElement("div");
    const form = document.createElement("form");
    const input = document.createElement("input");
    div.id = "container";
    form.id = "form";
    input.id = "new_category";
    input.setAttribute("type", "text");


    document.body.appendChild(div);
    document.getElementById("container").appendChild(form);
    document.getElementById("form").appendChild(input);


    document.getElementById("container").appendChild(done_btn);
    done_btn.innerHTML = "done";

}

const done_btn = document.createElement("button");
done_btn.addEventListener("click", function () {
    const ele = document.getElementById("new_category")
    if (ele.value != "" && amount.value != "") {
        category = ele.value;
        add_amount();
        document.getElementById("container").remove();
    }
});

const dbName = "Budget_Bucket";
const request = indexedDB.open(dbName)

request.onupgradeneeded = e =>{
    db = e.target.result;
    db.createObjectStore("transactions", {keypath:"trans_id", autoIncrement: true})
}
request.onsuccess = e =>{
    db = e.target.result;
    // alert("success");
}
request.onerror = e =>{
    console.log(`error : ${e.target.error}`)
}


