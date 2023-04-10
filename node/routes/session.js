const express= require('express');
const session = express.Router();
const { authenticateToken } = require('../middleware/jwt');
const { async_get_session_trans_for_month, async_update_session_details } = require('../actions/session_functions');




session.get('/:year/:month',authenticateToken,(req,res)=>{
    const email= req.user;
    const {year,month} = req.params;
    async_get_session_trans_for_month(year,month,email,res);
});

session.put('/',authenticateToken,(req,res)=>{
    const email = req.user;
    const {session_array} = req.body;
      async_update_session_details(session_array,email,res);
   })

module.exports= {session}; 
    