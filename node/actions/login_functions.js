const bcrypt= require('bcrypt');
const {connectDB} = require('../SQL/database');
const {generateJwtToken} = require('../middleware/jwt');
require('dotenv').config();

function user_exists(email){
    return new Promise((resolve,reject)=>{
        var sql = `SELECT * FROM users WHERE email="${email}"`;
        connectDB.query(sql,(err, result)=>{
            if(err){console.log(err);reject(err);}
            if(result[0]==undefined)
                resolve(false);
            else 
                resolve({"exists":true,"details":result[0]});
        }) 
    })
}
async function login_user(req,res){
    try{
        const {email,password,device_info} = req.body;
        const user = await user_exists(email);
        console.log("user: ",user);
        if(user.exists){
            const {pass_hash,User_loggedin_device} = user.details;
            if(User_loggedin_device==null){ 
                const valid = await bcrypt.compare(password,pass_hash);
                console.log("valid",valid);
                if(valid){
                    console.log(`Valid password: ${email} verified`);
                    let token= generateJwtToken(email,process.env.TOKEN_SECRET);
                    console.log(token);
                    
                    var sql = `UPDATE users SET User_loggedin_device='${device_info}' WHERE email='${email}'`;
                    connectDB.query(sql,(err,result)=>{
                        if(err) throw err;
                        console.log("device login info saved in database");
                        res.cookie('token',token);
                        res.send("successfully logged in & jwt token sent!!!");
                    })
                     
                }
                else{
                    res.send("Invalid password");
                }

            }else{
                res.send(`first log out from the device: ${User_loggedin_device}`); 
            }
        }else{
            res.send('first signup!!!');
        }

    }catch(err){

    }
}


module.exports= {user_exists,login_user};