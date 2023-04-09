const {connectDB}= require('../SQL/database');

function get_user_id(email){
    return new Promise((resolve,reject)=>{
        var sql = `SELECT * FROM users WHERE email="${email}"`;
        connectDB.query(sql,(err,result)=>{
            if(err){console.log(err); throw err; };
            resolve(result[0].user_id);
        })
    })
}

function get_budget_id(user_id,month,year){
    return new Promise((resolve,reject)=>{
        var sql =`SELECT * from budget_monthly WHERE user_id='${user_id}' AND MONTH(month) = '${month}' AND YEAR(month) = '${year}'`;
        connectDB.query(sql,(err,result)=>{
            if(err){console.log(err); throw err; };
            resolve(result[0].budget_id);
        })
    })
}

function check_session_id_already_exists(session_id){
    return new Promise((resolve,reject)=>{ 
        var sql = `SELECT * from session_budget WHERE session_id='${session_id}'`;
        connectDB.query(sql,(err,result)=>{
            if(err){console.log(err); throw err; };
            if(result[0]==undefined)
                resolve(0);
            else
                resolve(1);
        })
    })
}

function insert_session_records(sql){
    return new Promise((resolve,reject)=>{
        connectDB.query(sql,(err,result)=>{
            if(err){console.log(err); throw err; };
            resolve(`session budget initialised`);
        })
    })
}

function insert_transaction_records(sql){
    return new Promise((resolve,reject)=>{
        connectDB.query(sql,(err,result)=>{
            if(err){console.log(err); throw err; };
            resolve(`transactions saved to the database`);
        })
    })
}

function generate_trans_query(transactions,user_id,budget_id){
    let transactions_query="INSERT into transactions(user_id,budget_id,session_id,date,time,amount,category) VALUES ";
    let transactions_query_flag=0
    for(let i=0;i<transactions.length;i++){
        if(transactions[i].session_id==null){
            if(transactions_query_flag==0){
                transactions_query+=`('${user_id}', '${budget_id}', ${transactions[i].session_id}, '${transactions[i].date}', '${transactions[i].time}', '${transactions[i].amount}', '${transactions[i].category}')`;
                transactions_query_flag=1;  
            }
            else{
                transactions_query+=`,('${user_id}', '${budget_id}', ${transactions[i].session_id}, '${transactions[i].date}', '${transactions[i].time}', '${transactions[i].amount}', '${transactions[i].category}')`;
            }  
        }
        else{
            if(transactions_query_flag==0){
                transactions_query+=`('${user_id}', '${budget_id}', '${transactions[i].session_id}', '${transactions[i].date}', '${transactions[i].time}', '${transactions[i].amount}', '${transactions[i].category}')`;
                transactions_query_flag=1;  
            }
            else{
                transactions_query+=`,('${user_id}', '${budget_id}', '${transactions[i].session_id}', '${transactions[i].date}', '${transactions[i].time}', '${transactions[i].amount}', '${transactions[i].category}')`;
            }  
        }
                                   
    }
    return transactions_query;
}

function generate_session_query(session_ids_with_name,k,budget_id){
    let session_query="INSERT into session_budget(session_id,name,budget_id) VALUES ";
    let session_query_flag=0;
        for(;k<session_ids_with_name.length;k++){
            if(session_query_flag==0){
                session_query+=`('${session_ids_with_name[k].session_id}', '${session_ids_with_name[k].session_name}', '${budget_id}')`;
                session_query_flag=1;  
            }
            else{
                session_query+=`,('${session_ids_with_name[k].session_id}', '${session_ids_with_name[k].session_name}', '${budget_id}')`;
            }   
        }
    return session_query;
}

function get_session_ids_with_name_array(transactions,user_id){
    let session_trans=[];
    let session_ids_with_name=[];
    for(let i=0;i<transactions.length;i++){
        if(transactions[i].session_id!=null){
            transactions[i].session_id=user_id+"_"+transactions[i].session_id;
            session_trans.push(transactions[i]); 
        }
    }
    if(session_trans.length!=0)    
    session_ids_with_name.push({"session_id":session_trans[0].session_id,"session_name":session_trans[0].session_name});
    for(let i=0;i<(session_trans.length-1);i++){                    
        if(session_trans[i].session_id==session_trans[i+1].session_id){
                                //do nothing
        }else{
            session_ids_with_name.push({"session_id":session_trans[i+1].session_id,"session_name":session_trans[i+1].session_name});
        }
    }
    // console.log("transactions:",transactions);
    // console.log("session_ids:",session_ids_with_name); 
    return [session_ids_with_name,transactions];
}

async function insert_transactions(email,month,year,transactions,res){
    try{
        let user_id = await get_user_id(email);
    let budget_id= await get_budget_id(user_id,month,year);

    let result= get_session_ids_with_name_array(transactions,user_id);
    let session_ids_with_name=result[0];  
    transactions= result[1]; 
    console.log("transactions:",transactions);
    console.log("session_ids:",session_ids_with_name); 
    if(session_ids_with_name.length!=0){
        let k= await check_session_id_already_exists(session_ids_with_name[0].session_id);
        let session_sql = generate_session_query(session_ids_with_name,k,budget_id);
        let transaction_sql = generate_trans_query(transactions,user_id,budget_id);
        const insert_sess_records =  insert_session_records(session_sql);
        insert_sess_records.then((msg)=>{
        console.log(msg);
        insert_transaction_records(transaction_sql).then((msg)=>{console.log(msg);res.send(msg)}); 
        })
    }else{
        let transaction_sql = generate_trans_query(transactions,user_id,budget_id);
        insert_transaction_records(transaction_sql).then((msg)=>{console.log(msg);res.send(msg)}); 
    }
    }catch(err){
        console.log(err);
        res.status(500).send("server side err for transaction!!");
    }  
    
    
}


async function async_get_transactions_for_month(year,month,email,res){
    try{
        let user_id = await get_user_id(email);
        var sql = `select date,time,amount,category from transactions where MONTH(date)='${month}' and YEAR(date)='${year}' and user_id='${user_id}' ORDER BY date,time`;
        connectDB.query(sql,(err,result)=>{
            if(err) {console.log(err);}
            res.send(result);
        });
    }catch(err){
        console.log(err);
        res.status(500).send("server side err for transaction!!");
    }
        
}
module.exports= {insert_transactions, async_get_transactions_for_month,get_user_id} 
  