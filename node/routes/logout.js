const express= require('express');
const logout= express.Router();
const {connectDB}= require('../SQL/database');
const { authenticateToken } = require('../middleware/jwt');
require('dotenv').config();

  
logout.put('/',(req,res)=>{
    // const email = req.user;
    // console.log(email);
    // const email_fetched= new Promise((resolve,reject)=>{
    const {email}= req.body;
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