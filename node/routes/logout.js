const express= require('express');
const logout= express.Router();
const {connectDB}= require('../SQL/database');
// const { authenticateToken } = require('./jwt');
require('dotenv').config();

  
logout.put('/',(req,res)=>{
    const {email} = req.body;
    var sql = `UPDATE users SET User_loggedin_device=null WHERE email="${email}"`;
    connectDB.query(sql,(err,result)=>{
        if(err) throw err;
        if(result){
            // var {token}= req.cookies;
            //  token = null;
            res.clearCookie('token');
            console.log(`${email} successfully logged out`); 
            res.send(`${email} successfully logged out`);
        }
    }) 
})


module.exports={logout}; 