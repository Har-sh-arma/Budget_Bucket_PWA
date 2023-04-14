const express = require('express');
const signup = express.Router();
const { send_otp_to_user } = require('../actions/signup_get_otp_functions');
const { verify_otp } = require('../actions/signup_verify_otp_functions');


signup.post('/getOTP',(req,res)=>{
        send_otp_to_user(req,res); 
})

signup.post('/verifyOTP',(req,res)=>{
        verify_otp(req,res);
})


module.exports={signup}; 