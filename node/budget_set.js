// seting up the budget, and category wise 
const express= require('express');
const budget= express.Router();
const {connectDB}= require('./database');
const { authenticateToken } = require('./jwt');


budget.get('/:year/:month',authenticateToken,(req,res)=>{
    const email = req.user;
    const {month,year} = req.params;
    
    var sql = `SELECT * FROM users WHERE email="${email}"`;
    connectDB.query(sql,(err,result)=>{
        if(err) throw err;
        if(result){
            const temp= result[0].user_id;
            let user_id= temp;  
            // console.log("user_id",user_id); 
            var sql = `SELECT * from budget_monthly WHERE user_id='${user_id}' AND MONTH(month) = '${month}' AND YEAR(month) = '${year}'`;
            
                 connectDB.query(sql,(err,result)=>{  
                    if(err) throw err;
                    if(result[0]==undefined)
                        res.send("no such records found");
                    console.log(`budget for the month:${month} and year:${year} is : ${result[0]}`);   
                    res.json(result[0]); 
                    }) ; 
        }
    }) 
})


budget.post('/',authenticateToken,(req,res)=>{
    const email = req.user;
    const {month,budget,food_budget,utilities_budget,transport_budget,entertainment_budget,misc_budget,if_session}= req.body;
    var sql = `SELECT * FROM users WHERE email="${email}"`;
    connectDB.query(sql,(err,result)=>{
        if(err) throw err;
        if(result){
            const temp= result[0].user_id;
            let user_id= temp;  
            // console.log("user_id",user_id); 
            var sql = `INSERT into budget_monthly(user_id,month,budget,food_budget,utilities_budget
                ,transport_budget,entertainment_budget,misc_budget,if_session)
                 VALUES ('${user_id}', '${month}', '${budget}', '${food_budget}', '${utilities_budget}', 
                 '${transport_budget}', '${entertainment_budget}', '${misc_budget}', '${if_session}')`;
            
                 connectDB.query(sql,(err,result)=>{  
                    if(err) throw err;
                    console.log(`budget has been set for user_id: ${user_id}`);   
                    res.send(`budget has been set for user_id: ${user_id}`); 
                    }) ; 
        }
    }) 
})


budget.put('/',authenticateToken,(req,res)=>{
    const email = req.user;
    const {month,budget,food_budget,utilities_budget,transport_budget,entertainment_budget,misc_budget,if_session}= req.body;
    var sql = `SELECT * FROM users WHERE email="${email}"`;
    connectDB.query(sql,(err,result)=>{
        if(err) throw err;
        if(result){
            const temp= result[0].user_id;
            let user_id= temp;  
            console.log(month); 
            var sql = `UPDATE budget_monthly SET budget='${budget}',food_budget='${food_budget}',utilities_budget='${utilities_budget}'
                ,transport_budget='${transport_budget}',entertainment_budget='${entertainment_budget}', misc_budget='${misc_budget}',if_session='${if_session}'
                 WHERE user_id='${user_id}' and month='${month}'`
            
                 connectDB.query(sql,(err,result)=>{  
                    if(err) throw err;
                    console.log(`budget has been updated for user_id: ${user_id}`);   
                    res.send(`budget has been updated for user_id: ${user_id}`); 
                    }) ;   
        }    
    }) 

});

budget.put('/spendings',authenticateToken,(req,res)=>{
    const email = req.user;
    const {month,spent,food_spent,utilities_spent,transport_spent,entertainment_spent,misc_spent}= req.body;
    var sql = `SELECT * FROM users WHERE email="${email}"`;
    connectDB.query(sql,(err,result)=>{
        if(err) throw err;
        if(result){
            const temp= result[0].user_id;
            let user_id= temp;  
            console.log(month); 
            var sql = `UPDATE budget_monthly SET spent='${spent}', food_spent='${food_spent}',utilities_spent='${utilities_spent}'
                ,transport_spent='${transport_spent}',entertainment_spent='${entertainment_spent}', misc_spent='${misc_spent}'
                 WHERE user_id='${user_id}' and month='${month}'`
            
                 connectDB.query(sql,(err,result)=>{  
                    if(err) throw err;
                    console.log(`budget spendings has been updated for user_id: ${user_id}`);   
                    res.send(`budget spendings has been updated for user_id: ${user_id}`); 
                    }) ;   
        }    
    }) 

})
   

module.exports= {budget};  
    