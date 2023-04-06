const {connectDB} = require('../SQL/database');
const { get_user_id }= require('../actions/transaction_functions')

function update_session_details(session_array,i,user_id){
    return new Promise((resolve,reject)=>{
        console.log(session_array[i].categorywise);
        var sql =  `UPDATE session_budget SET spent='${session_array[i].spent}',categorywise = '${JSON.stringify(session_array[i].categorywise)}' WHERE session_id='${user_id+"_"+session_array[i].session_id}'`;
        connectDB.query(sql,(err,result)=>{
            if(err){console.log(err); reject(err)}
            resolve(++i);
        })
    })
}

async function async_update_session_details(session_array,email,res){
    let i=0
    const user_id = await get_user_id(email);
    while(i<session_array.length){
        i = await update_session_details(session_array,i,user_id);
        console.log("inserted  a session",i-1);
        if(i==session_array.length)
        res.send("inserted sessions"); 
    }

}



function get_session_trans_for_month(month,year,user_id){
    return new Promise((resolve,reject)=>{
        var sql =`select session_budget.name,session_budget.categorywise,transactions.amount,transactions.date,transactions.category
    from session_budget 
    INNER JOIN transactions 
    ON 
    transactions.session_id= session_budget.session_id 
    and MONTH(date)='${month}' 
    and YEAR(date)='${year}'
    and user_id='${user_id}'`;
          connectDB.query(sql,(err,result)=>{  
             if(err) throw err;
             console.log(result);
             resolve(result);

          })
    })
    
}

async function async_get_session_trans_for_month(year,month,email,res){
    let user_id= await get_user_id(email);
    const session_transactions = await get_session_trans_for_month(month,year,user_id);
    console.log(session_transactions);
    res.send(session_transactions);
}

module.exports={async_get_session_trans_for_month,async_update_session_details}