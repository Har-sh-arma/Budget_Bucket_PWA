const bcrypt= require('bcrypt');
const {connectDB} = require('../SQL/database');
const { delete_otp } = require('../actions/otp');



function insertDB_user_details(user_name,email,DOB,location,pass_hash){
    return new Promise((resolve,reject)=>{
        var sql = `INSERT INTO users(name,email,pass_hash) VALUES ('${user_name}', '${email}','${pass_hash}')`;
        connectDB.query(sql, function (err, result) {
          if (err){console.log(err);reject(err);}
          console.log("1 record inserted to users table");
          resolve(true);
    })
    })
   
  };  

function get_otp_hash(email){
    return new Promise((resolve,reject)=>{
        var sql = `SELECT * FROM user_otp WHERE email="${email}" and arrival_time IN (SELECT max(arrival_time) FROM user_otp)`;
        connectDB.query(sql,(err, result)=>{
            if(err){console.log(err);reject(err);}
            if(result[0]!=undefined)
                resolve(result[0].otp_hash); 
            else
                resolve(false);
                
                console.log(result[0].otp_hash);
           
        })
    })
}

async function verify_otp(req,res){
    try{
        const {email} = req.body;
        const otp_hash = await get_otp_hash(email);
        if(otp_hash){
            const {otp, email,DOB,location,password,name} = req.body;
            const valid= await bcrypt.compare(otp,otp_hash);
            // console.log("valid",valid);
            if(valid){
                console.log(`Valid OTP: ${email} verified`);
                var salt = Math.ceil(Math.random()*20);
                const pass_hash= await bcrypt.hash(password,salt);
                // console.log("pass_hash",pass_hash);
                const insert = await insertDB_user_details(name,email,DOB,location,pass_hash)
                // console.log("insert ",insert);
                if(insert){  
                    const deleted = await delete_otp(email);
                    // console.log("deleted ",deleted)
                    if(deleted){
                        res.send(`Successfully registered ${email}`);
                    }
                }
            }
            else{
                const deleted= await delete_otp(email);
                if(deleted){
                    res.send("invalid otp");
                }
            }

        }else{
            res.send('invalid Request');
        }

    }catch(err){
        console.log(err);
        res.status(500).send("server side otp err has occured!!");
    }
    
}

  
module.exports= {verify_otp,get_otp_hash};