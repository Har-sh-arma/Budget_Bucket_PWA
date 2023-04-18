const express = require('express');
const { authenticateToken } = require('../middleware/jwt');
const { user_exists } = require('../actions/login_functions');
const profile = express.Router();


// profile.post('/',authenticateToken,(req,res)=>{
    
// })

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

