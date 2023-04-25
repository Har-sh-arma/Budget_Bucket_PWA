// budget = {
//     extra: 0,
//     amount: 0,
//     categories: ['Transport', 'Food', 'Entertainment', 'Utilities'],
//     spendings: {
//         total_spent: 0,
//         11_09_22_12_56: { date: "aaj ka date", time: 'abhi ka time', amount: "100", category: "food" }
//     }
// }
// if (localStorage.getItem("lstring")===null){
//     localStorage.setItem("lstring", 'Transport Food Entertainment Utilities miscellaneous')
//     localStorage.setItem("extra",0)
//     localStorage.setItem("budget",0)
// } 
let extra = Number(localStorage.getItem("extra"))
let lstring = localStorage.getItem("lstring")
let budget = Number(localStorage.getItem("budget"))


let cat_list = lstring.split(" ");


let category = document.getElementById("categories");



function display_cat() {
    extra = 0
    let list = category.children;
    while (list.length != 0) {
        category.removeChild(list[0]);
        list = category.children;
    }
    for (i in cat_list) {
        let cat = document.createElement('button');
        cat.innerHTML = cat_list[i];
        cat.className = "cat_buts";

        if (i > 4) {
            extra+=1
            cat.id = i;
            cat.addEventListener("click", (e)=> {
                let el = e.target;
                cat_list.splice(Number(el.id), 1);
                el.remove();
                display_cat();
            });
        }
        s = ""
        cat_list.map((i)=>s+=` ${i}`)
        lstring = s.slice(1)
        localStorage.setItem("lstring",lstring)
        localStorage.setItem("extra",extra)
        category.appendChild(cat);
    }
}

function add_cat() {
    let category = document.getElementById("cat");
    // console.log(category);
    let val = category.value;
    // console.log(extra)
    if (extra >= 3) {
        alert("Extra categories : limit reached");
    }
    else if(val != ""){
        cat_list.push(val);
        display_cat();
    }
    document.getElementById("cat").value = "";
}

function edit_budget_amount() {
    localStorage.setItem("set_budget",1);
    let tom = document.getElementById("bud");
    if (tom.value != "") {
        budget = tom.value;
        let date = new Date();
        let month = date.getMonth();
        month++;
        // localStorage.setItem("userEmail", user.email)
        let fulldate = date.getFullYear()+ "-" + month + "-" +date.getDate();
        axios.post("/budget_set", {month:fulldate, budget:budget,food_budget:null,utilities_budget:null,transport_budget:null,entertainment_budget:null,misc_budget:null,if_session:null,email:userEmail}, {
            baseURL: ForwardingURL,
            withCredentials: true
        }).then(res => {
            alert("Budget Set")
        })
        tom.placeholder = budget;
    }
    tom.value = "";
    localStorage.setItem("budget",budget)
    // console.log(budget.amount);
}

display_cat();
document.getElementById("bud").placeholder= budget; 

