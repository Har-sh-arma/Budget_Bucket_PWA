const {send_mail}= require('../actions/nodemailer');
const {generateOTP,insertDB_user_otp_details}= require('../actions/otp');
const {connectDB}= require('../SQL/database');
const bcrypt= require('bcrypt');
require('dotenv').config();

function user_exists(email){
    return new Promise((resolve,reject)=>{
        var sql = `SELECT * FROM user_otp WHERE email="${email}"`;
        connectDB.query(sql,(err, result)=>{
            if(err){console.log(err);throw err;}
            if(result[0]==undefined)
                resolve(false);
            else 
                resolve(true);
        })
    })
}
async function send_otp_to_user(req,res){
    try{
            const {email} = req.body;
            const exists = await user_exists(email);
            // console.log("exists ",exists);
            if(exists){
                    res.status(402);
                    res.send("Already Signed Up");
            }else{
                    let otp = generateOTP();
                    var salt = Math.ceil(Math.random()*20); 
                    const mail= await send_mail(email, otp);
                    // console.log("mail ",mail)
                    if(mail){
                     const otp_hash = await bcrypt.hash( otp, salt);
                    //  console.log("otp_hash",otp_hash);
                     if(otp_hash){
                        const insert=await insertDB_user_otp_details(email,otp_hash);
                        // console.log("insert ",insert);
                        if(insert){
                            res.status(201);
                            res.send(`${email} has been sent an otp.`);
                            console.log(`${email} was sent ${otp}`);
                        }
                      }
                    }     
            }
    }catch(err){
            console.log(err);
            res.status(500).send("server side otp err has occured");
    }
}

module.exports= {send_otp_to_user};
