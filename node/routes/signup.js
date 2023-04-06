const express = require('express');
const signup = express.Router();
const { send_otp_to_user } = require('../actions/signup_functions');



signup.post('/',(req,res)=>{
        send_otp_to_user(req,res); 
})


module.exports={signup}; 