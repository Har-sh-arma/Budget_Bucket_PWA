const express= require('express');
const transaction= express.Router();
const {connectDB}= require('./database');
const { authenticateToken } = require('./jwt');
const {insert_transactions, get_user_id}= require('./trans_functions');

transaction.post('/',authenticateToken,(req,res)=>{
    const email = req.user;
    let {transactions}= req.body; 
    let dt = new Date(transactions[0].date);let month = dt.getMonth()+1; let year = dt.getFullYear();
    insert_transactions(email,month,year,transactions,res);
});

//get transactions for a past 6 months
transaction.get('/',authenticateToken,(req,res)=>{
    const email = req.user;
    const get_transactions=async()=>{
        let user_id = await get_user_id(email);
        var sql = `SEL`

    }
    
    
})

//get sessioin transactions for a particular month only and send the sum to the 
module.exports= {transaction};