const express= require('express');
const logout= express.Router();
const {connectDB}= require('../SQL/database');
const { authenticateToken } = require('../middleware/jwt');
const { insert_transactions } = require('../actions/transaction_functions');
require('dotenv').config();

  
logout.post('/',(req,res)=>{
    // const email = req.user;
    // console.log(email);
    // const email_fetched= new Promise((resolve,reject)=>{
        let {transactions,email}= req.body; 
        let dt = new Date(transactions[0].date);let month = dt.getMonth()+1; let year = dt.getFullYear();
        insert_transactions(email,month,year,transactions,res);
    // const {email}= req.body;
    // })
    var sql = `UPDATE users SET User_loggedin_device=null WHERE email='${email}'`;
    connectDB.query(sql,(err,result)=>{
        if(err) return res.status(500).send("logout error ");
        if(result){
            // var {token}= req.cookies;
            //  token = null;
            console.log(`${email} successfully logged out`); 
            res.clearCookie('token').send(`${email} successfully logged out`);
        }
    }) 
})


module.exports={logout}; 