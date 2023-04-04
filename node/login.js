const express = require('express');
const login = express.Router();
require('dotenv').config();
const bcrypt= require('bcrypt');
const {connectDB} = require('./database');
const { authenticateToken ,generateJwtToken} = require('./jwt');


async function find_login(email,req,res){
    
    var found;
    let pass_hash;
    let device;
    var sql = `SELECT * FROM users WHERE email="${email}"`;
    const query = new Promise((resolve,reject)=>{
    connectDB.query(sql, function (err, result) {
            if (err) throw err ;

            console.log(result);
            found=false;
            if(result[0]){
                found = true;
                const temp=result[0];
                device= result[0].device_login;
                 pass_hash=temp.password;
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
    var User =found; 
    console.log(pass_hash);
    verify_user(req,res,User,pass_hash,device);   
}

const verify_user= async(req,res,User,pass_hash,device)=>{
    try{
        const {password, email,device_info} = req.body;
        if(User){
            // console.log(device!=undefined);
            if(device=='undefined'){ 
                bcrypt.compare(password,pass_hash,(err,data)=>{
                    if(err) throw err;
                    if(data){
                        console.log(`Valid password: ${email} verified`);
                        let token= generateJwtToken(email,process.env.TOKEN_SECRET);
                        console.log(token);
                        
                        var sql = `UPDATE users SET device_login='${device_info}' WHERE email='${email}'`;
                        connectDB.query(sql,(err,result)=>{
                            if(err) throw err;
                            console.log("device login info saved in database");
                            
                        })
                        res.cookie('token',token,{ path: '/', secure: true }).send("successfully logged in & jwt token sent!!!")
                    }
                    else{
                        res.send("Invalid password");
                    }
                }); 

            }else{
                res.send(`first log out from the device: ${device}`); 
            }
          
        }
        else{
            res.send('first signup!!!')
        }
     
    }catch(err){
        console.log(err);
    }
   
}




login.get('/',authenticateToken,(req,res)=>{
   res.send(`welcome: ${req.user}`);
})
login.post('/verify_login',(req,res)=>{
    const {email} = req.body;
    find_login(email,req,res);
})


module.exports={login};
