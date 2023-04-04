


budget = {
    extra: 0,
    amount: 0,
    categories: ['transport', 'food', 'entertainment', 'utilities'],
    spendings: {
        total_spent: 0,

    }
}
let category = null;

function category_add(cat) { category = cat }
// function foodi() { category = "food"; }
// function cloth() { category = "cloth"; }
// function transport() { category = "transport"; }
// function medical() { category = "medical"; }
// function entertainment() { category = "entertainment"; }
// function utilities() { category = "utilities"; }
// function education() { category = "education"; }



function add_amount() {
    if (category != null) {

        let date = new Date();
        let month = date.getMonth();
        month++;
        let fulldate = date.getDate() + "-" + month + "-" + date.getFullYear();
        let fulltime = date.getHours() + ":" + date.getMinutes() + ":" + date.getSeconds();
        let date_time = fulldate + "_" + fulltime;

        transaction = {
            date: fulldate,
            time: fulltime,
            category: category,
            amount: amount.value
        }
        budget.spendings[date_time] = transaction;
        category = null;
    }
    else {
        alert("select the category first!!!");
    }
}

function display_but() {
    for (i in budget.categories) {
        let e = document.createElement('button');
        e.id = budget.categories[i];
        e.addEventListener('click', category_add);
    }
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








