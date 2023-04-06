require('dotenv').config();
const express= require('express');
const { verify_otp } = require('../actions/verify_otp_functions');

const verify = express.Router();


verify.post('/',(req,res)=>{
    verify_otp(req,res);
})

module.exports= {verify};
