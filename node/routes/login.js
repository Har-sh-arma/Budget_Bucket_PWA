const express = require('express');
const login = express.Router();
const { authenticateToken } = require('../middleware/jwt');
const { login_user } = require('../actions/login_functions');




login.post('/',(req,res)=>{
    login_user(req,res);
})


module.exports={login};
