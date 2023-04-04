const express = require('express');
const signup = express.Router();
const {send_mail}= require('./nodemailer');
const {generateOTP}= require('./otp');
const {connectDB,insertDB_user_otp_details}= require('./database');
const bcrypt= require('bcrypt');
const saltRounds=10;
require('dotenv').config();



const user_send_otp= async(req,res,repeated_mail)=>{
        const {email} = req.body;
        if(repeated_mail){
                res.status(402);
                res.send("Already Signed Up");
        }
        else{	
                try{
                        let otp = generateOTP(); 
                        send_mail(email, otp);
                        const otp_hash = await bcrypt.hash( otp, saltRounds);
                        console.log();
                        await insertDB_user_otp_details(email,otp_hash);
                        res.status(201);
                        res.send(`${email} has been sent an otp.`)
                        console.log(`${email} was sent ${otp}`);
                }catch(err){
                        console.log(err);  
                }
        
               
        }
    }
    
    
    async function  signup_user(email,req,res){
    
        var found;
        var sql = `SELECT * FROM users WHERE email = '${email}'`;
        const query = new Promise((resolve,reject)=>{
        connectDB.query(sql, function (err, result) {
                if (err) throw err ;
    
                console.log(result);
                found=false;
                if(result[0])
                        found = true;
                if(!found){
                        console.log("no such email found",found)
                        resolve();   
                }
                else{
                        console.log("same email found",found);
                        resolve(); 
                }    
        })
       })     
        await query;
        var repeated_mail =found; 
        user_send_otp(req,res,repeated_mail);   
    }

signup.post('/',(req,res)=>{

        const {email} = req.body;
        signup_user(email,req,res); 
        
})


module.exports={signup}; 