


let db = null;
let j = 1;

const dbName = "Budget_Bucket";
const request = indexedDB.open(dbName)
var tables= document.getElementById("tables");


request.onsuccess = e =>{
    db = e.target.result;
    const tx = db.transaction("transactions", "readonly");
    const trans = tx.objectStore("transactions");
    var cursorRequest = trans.openCursor();
    cursorRequest.onsuccess = e =>{
      const cursor = e.target.result;
      if (cursor) {
        console.log(cursor.value);
        cursor.continue();
        add_data(cursor.value.date, cursor.value.time, cursor.value.category, cursor.value.amount)
      }
    }
    // alert("success");
}

const add_data = (date, time, category, amount)=>{
  var row = tables.insertRow(j);
  var cell1 = row.insertCell(0);
  var cell2 = row.insertCell(1);
  var cell3 = row.insertCell(2);
  var cell4 = row.insertCell(3);
  cell1.innerHTML=date;
  cell2.innerHTML=time;
  cell3.innerHTML=category;
  cell4.innerHTML=amount;
  j+=1
}
