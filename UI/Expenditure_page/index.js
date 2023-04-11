
budget = JSON.parse(Android.load_budget_data());

let keys = Object.keys(budget.spendings);
let j = 1;
for(i in keys)

{   
   if(keys[i]==="total_spent")
     { 
      //do nothing
            }
   
      // console.log(i);
    else{
      var tables= document.getElementById("tables");
      var row = tables.insertRow(j);
      var cell1 = row.insertCell(0);
      var cell2 = row.insertCell(1);
      var cell3 = row.insertCell(2);
      var cell4 = row.insertCell(3);
      cell1.innerHTML=budget.spendings[keys[i]].date;
      cell2.innerHTML=budget.spendings[keys[i]].time;
      cell3.innerHTML=budget.spendings[keys[i]].category;
      cell4.innerHTML=budget.spendings[keys[i]].amount;
      
  j++;
    }
      
   
}
