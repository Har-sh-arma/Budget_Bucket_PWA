const express = require('express');
const { authenticateToken } = require('../middleware/jwt');
const profile = express.Router();
const {connectDB}= require('../SQL/database');
const { get_profile } = require('../actions/profile_functions');


profile.put('/',(req,res)=>{
    // const email= req.user;
    const {name,DOB,location,profile,email}= req.body;
   var sql = `UPDATE users SET name='${name}' , DOB='${DOB}' , location='${location}' , profile='${profile}' where email='${email}'`
   connectDB.query(sql,(err,result)=>{
    if(err){console.log(err); res.status(400).send("server side err");}
    res.send("updated profile");
    console.log("updated profile");
})
}) 

profile.get('/',(req,res)=>{  
   get_profile(req,res); 
})


module.exports= {profile}
 
