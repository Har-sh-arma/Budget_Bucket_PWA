const {connectDB}= require('./database')








function create_session_record(user_id,session_id,budget_id,session_name,categorywise){
    var sql = `INSERT into session_budget(session_id,name,budget_id,catorgorywise)
         VALUES ('${session_id}', '${session_name}', '${budget_id}', '${spent}', '${categorywise}')`;
         connectDB.query(sql,(err,result)=>{  
            if(err) throw err;
            console.log(` ${session_name} session is created for user_id: ${user_id} with session_id : ${session_id}`);   
            // res.send(` ${name} session is created for user_id: ${user_id} with session_id : ${session_id}`); 
            }); 
}
module.exports= {create_session_record};