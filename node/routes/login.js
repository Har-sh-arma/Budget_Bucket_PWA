const express = require('express');
const login = express.Router();
const { authenticateToken } = require('../middleware/jwt');
const { login_user } = require('../actions/login_functions');





login.get('/',authenticateToken,(req,res)=>{
   res.send(`welcome: ${req.user}`);
})



login.post('/verify_login',(req,res)=>{
    login_user(req,res);
})


module.exports={login};
