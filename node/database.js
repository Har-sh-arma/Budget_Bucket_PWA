require('dotenv').config();

const mysql= require('mysql2');
   const connectDB= mysql.createConnection({
        host:process.env.MYSQL_HOST,
        user:process.env.MYSQL_USER,
        password: process.env.MYSQL_PASSWORD,
        database: process.env.MYSQL_database
    });
  
    connectDB.connect((err)=>{
      if(err){
          throw err;
      }
      console.log("connected to first_sql_db database..."); 
  
  })



async function insertDB_user_otp_details(email,otp){
  var sql = `INSERT INTO user_otp(email,otp) VALUES ('${email}', '${otp}')`;
  connectDB.query(sql, function (err, result) {
    if (err) throw err;
    console.log("1 record inserted to user_otp");
})
};

async function insertDB_user_details(user_name,email,DOB,location,pass_hash,device_info){
  var sql = `INSERT INTO users(user_name,email,DOB,location,password,device_login) VALUES ('${user_name}', '${email}', '${DOB}', '${location}', '${pass_hash}', '${device_info}')`;
  connectDB.query(sql, function (err, result) {
    if (err) throw err;
    console.log("1 record inserted to user table");
})
};  
  
async function delete_otp(email){
  var sql = `DELETE FROM user_otp WHERE email="${email}"`; 
  connectDB.query(sql, function (err, result) {
    if (err) throw err;
    console.log(`otp for ${email} deleted successfully`);
})
};

module.exports={connectDB,insertDB_user_otp_details,insertDB_user_details,delete_otp};





