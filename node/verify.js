require('dotenv').config();
const express= require('express');
const verify = express.Router();
const bcrypt= require('bcrypt');
const {insertDB_user_details,delete_otp,connectDB} = require('./database');


async function find_otp(email,req,res){
    
    var found;
    let otp_hash;
    var sql = `SELECT * FROM user_otp WHERE email="${email}" and arrival_time IN (SELECT max(arrival_time) FROM user_otp)`;
    const query = new Promise((resolve,reject)=>{
    connectDB.query(sql, function (err, result) {
            if (err) throw err ;

            console.log(result);
            found=false;
            if(result[0]){
                found = true; 
                const temp= result[0];
                 otp_hash=temp.otp;
            }
                   
            if(found){
                    console.log("email found",found)
                    resolve();   
            } 
            else{ 
                    console.log(" no such email found",found);
                    resolve(); 
            }    
    })
   })     
    await query;
    var OtpUser =found; 
    console.log(otp_hash);
    verify_otp(req,res,OtpUser,otp_hash);   
}





const verify_otp= async(req,res,OtpUser,otp_hash)=>{
    try{ 
        const {otp, email,DOB,location,password,name,device_info} = req.body;
        if(OtpUser){

            bcrypt.compare(otp,otp_hash,async(err,data)=>{
                var salt = Math.ceil(Math.random()*10);
                if(err) throw err;
                if(data){
                    console.log(`Valid OTP: ${email} verified`);
                    const pass_hash= await bcrypt.hash(password,salt);
                    console.log(pass_hash);
                    insertDB_user_details(name,email,DOB,location,pass_hash,device_info);
                    res.send(`Successfully registered ${email}`);
                    delete_otp(email);
                }
                else{
                    delete_otp(email);
                    res.send("Invalid otp!!");
                }
            });
        }
        else{
            res.send('invalid Request')
        }
     
    }catch(err){
        console.log(err);
    }
   
}

verify.post('/',(req,res)=>{
    const {email}= req.body;
    find_otp(email,req,res);
})


module.exports= {verify};