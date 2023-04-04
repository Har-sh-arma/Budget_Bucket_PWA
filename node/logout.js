const express= require('express');
const logout= express.Router();
const {connectDB}= require('./database');
const { authenticateToken } = require('./jwt');


logout.put('/',(req,res)=>{
    const {email} = req.body;
    var sql = `UPDATE users SET device_login='undefined' WHERE email="${email}"`;
    connectDB.query(sql,(err,result)=>{
        if(err) throw err;
        if(result){
            // var {token}= req.cookies;
            //  token = null;
            res.clearCookie('token',{path:'/',secure:true});
            console.log(`${email} successfully logged out`);
            res.send(`${email} successfully logged out`);
        }
    })
})


module.exports={logout};