const { connectDB } = require("../SQL/database");



const generateOTP = ()=>{
    let otp = Math.ceil(Math.random()*10000);
    if(otp<1000){otp+=1000;}
    console.log(otp);
    let otp_string=otp.toString()
    return otp_string;
}

function insertDB_user_otp_details(email,otp_hash){
    return new Promise((resolve,reject)=>{
        var sql = `INSERT INTO user_otp(email,otp_hash) VALUES ('${email}', '${otp_hash}')`;
        connectDB.query(sql, function (err, result) {
        if (err){console.log(err);reject(err);}
        console.log("1 record inserted to user_otp");
        resolve(true);
    }) 
    })
   
  };
  
   
  function delete_otp(email){
    return new Promise((resolve,reject)=>{
      var sql = `DELETE FROM user_otp WHERE email="${email}"`; 
      connectDB.query(sql, function (err, result) {
        if (err){console.log(err);reject(err);}
        console.log(`otp for ${email} deleted successfully`);
        resolve(true);
      })
    })
  };
  

module.exports={generateOTP,insertDB_user_otp_details,delete_otp};