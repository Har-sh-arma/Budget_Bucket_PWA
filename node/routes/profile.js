const express = require('express');
const { authenticateToken } = require('../middleware/jwt');
const { user_exists } = require('../actions/login_functions');
const profile = express.Router();
const {connectDB}= require('../SQL/database');


profile.put('/',authenticateToken,(req,res)=>{
    const email= req.user;
    const {name,DOB,location,profile}= req.body;
   var sql = `UPDATE users SET name='${name}' , DOB='${DOB}' , location='${location}' , profile='${profile}' where email='${email}'`
   connectDB.query(sql,(err,result)=>{
    if(err){console.log(err); res.status(400).send("server side err");}
    res.send("updated profile");
    console.log("updated profile");
})
})

profile.get('/',authenticateToken,(req,res)=>{
   async(req,res)=>{
        try{
            const user = await user_exists(req.email);
            if(user.exists){
                console.log(user);
                res.json(user.details);
            }

        }catch(err){
            res.status(500).send("server side err");
        }
   }
})


module.exports= {profile}

