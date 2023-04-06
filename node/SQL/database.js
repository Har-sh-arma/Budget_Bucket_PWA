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




module.exports={connectDB};





