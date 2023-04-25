const express= require('express');
const transaction= express.Router();
const { authenticateToken } = require('../middleware/jwt');
const { insert_transactions, async_get_transactions_for_month } = require('../actions/transaction_functions');


  
// transaction.post('/',(req,res)=>{
//     // const email = req.user;
//     let {transactions,email}= req.body; 
//     let dt = new Date(transactions[0].date);let month = dt.getMonth()+1; let year = dt.getFullYear();
//     insert_transactions(email,month,year,transactions,res);
// });

//get transactions for a particular year and month
transaction.get('/:year/:month',(req,res)=>{
    // const email = req.user;
    const {year,month,email}= req.params;
    async_get_transactions_for_month(year,month,email,res);
})

module.exports= {transaction};