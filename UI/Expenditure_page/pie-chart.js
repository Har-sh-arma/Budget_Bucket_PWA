
if (localStorage.getItem("set_budget")=== "0"){alert("Set a Budget first ");window.location.href = "../Budget_page";}

let cat_obj = { "Food": 0,"Utilities" : 0,"Transport" : 0, "Entertainment" : 0, "miscellaneous" : 0}

let cat_list = ["Food","Utilities" ,"Transport", "Entertainment", "miscellaneous"];

const isDefault=(a)=>{
    for(i in cat_list){
        if (cat_list[i]===a) {
                    return true
                }
    }
    return false;
}

setTimeout(()=>{

    const newRequest = indexedDB.open(dbName)

    newRequest.onsuccess = e =>{
        db = e.target.result;
        const tx = db.transaction("transactions", "readonly");
        const trans = tx.objectStore("transactions");
        var cursorRequest = trans.openCursor();
        cursorRequest.onsuccess = e =>{
          const cursor = e.target.result;

          if (cursor) {
            console.log(isDefault(cursor.value.category));
            if (isDefault(cursor.value.category)) {
                cat_obj[cursor.value.category] += Number(cursor.value.amount)
            }
            else{
                cat_obj["miscellaneous"] += Number(cursor.value.amount)
            }
            cursor.continue();
          }
        }

        // alert("success");
    }}, 0)


setTimeout(()=>{
    new Chart(document.getElementById('pie-chart'), {
        type: 'pie',
        data: {
            labels: ["Food", "Utilities", "Transport", "Entertainment", "miscellaneous"],
            datasets: [{
                backgroundColor: ["#52D726", "#FFEC00",
                    "#FF0000", "#007ED6", "#7CDDDD"
                ],
                data: [cat_obj.Food, cat_obj.Utilities, cat_obj.Transport, cat_obj.Entertainment, cat_obj.miscellaneous]
            }]
        },
        options: {
            title: {
                display: true,
                text: 'Pie Chart for admin panel'
            },
            responsive: true
        }
    });
    }, 500)
