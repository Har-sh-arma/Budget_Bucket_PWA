const express= require('express');
const transaction= express.Router();
const {connectDB}= require('./database');
const { authenticateToken } = require('./jwt');



transaction.post('/',authenticateToken,(req,res)=>{
    const email = req.user;
    const {transactions}= req.body;
    console.log(transactions);
    
 
    var sql = `SELECT * FROM users WHERE email="${email}"`;
    connectDB.query(sql,(err,result)=>{
        if(err) throw err; 
        if(result){
            const temp= result[0].user_id;
            let user_id= temp;  
            // console.log("user_id",user_id); 
            var query ="";
            let session_trans=[];
            let dt = new Date(transactions[0].date);
            let month = dt.getMonth()+1;
            let year = dt.getFullYear();
            // console.log(`month:${month}, year:${year} , user_id:${user_id}`)
            var sqls = `SELECT * from budget_monthly WHERE user_id='${user_id}' AND MONTH(month) = '${month}' AND YEAR(month) = '${year}'`;
            connectDB.query(sqls,(err,result)=>{  
               if(err) throw err;
               if(result){
                console.log(result[0]);
                let budget_id= result[0].budget_id;
                console.log("budget_id",budget_id);
                console.log(transactions.length);
                let flag=0;
                for(let i=0;i<transactions.length;i++){
                 if(transactions[i].session_id!=null){
                     
                     session_trans.push(transactions[i]);
                 }
                 else{
                     if(flag==0){
                         query += `('${user_id}', '${budget_id}', ${transactions[i].session_id}, '${transactions[i].date}', '${transactions[i].time}', '${transactions[i].amount}', '${transactions[i].category}')`;
                         flag=1;
                     }else{
                         query += `,('${user_id}', '${budget_id}', ${transactions[i].session_id}, '${transactions[i].date}', '${transactions[i].time}', '${transactions[i].amount}', '${transactions[i].category}')`;
                     }
                 } 
                   
                 }
                 var sql = `INSERT into transactions(user_id,budget_id,session_id,date,time,amount,category) VALUES ${query}` ;
                      connectDB.query(sql,(err,result)=>{  
                         if(err) throw err;
                         console.log(`transactions are saved in db for user_id: ${user_id}`);   
                         // let rowsaffected = result.affectedRows();
                         res.send(`transactions are saved in db for user_id: ${user_id}`); 
                         }) ;  
                
               }
               
            })
        }  
    }) 
   
})
module.exports= {transaction};