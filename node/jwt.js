const jwt = require('jsonwebtoken')
require('dotenv').config();
const {connectDB}= require('./database');

function generateJwtToken(email,secretkey){
    return jwt.sign(email,secretkey);
}


function authenticateToken(req, res, next) {
    const {token} = req.cookies;
    // console.log(token);
    if (token == undefined || token==null){
        return res.send("sign in with password");
    } 
  
    jwt.verify(token, process.env.TOKEN_SECRET, (err, user) => {
      console.log(err)
   
      if (err) return res.send("sign in with password");
  
      req.user = user;
        // console.log(user_mail);
        var sql = `select * from users where email="${req.user}"`;
        connectDB.query(sql,(err,result)=>{
            if(err) throw err;
            if(result){  
                console.log("jwt token verified");
                next();
            }
            else{
                res.send("sign in with password!!");
            }
        })
  
    })
  }
  
module.exports= {generateJwtToken,authenticateToken};