const express = require('express');
const app = express();
const PORT = 5050;
const { urlencoded } = require('express');
const cookieParser= require('cookie-parser')
require('dotenv').config();


//Router paths
const {signup} = require('./signup');
const {verify} = require('./verify'); 
const {login}= require('./login');
const {logout}= require('./logout');
const {authenticateToken}= require('./jwt');
const {budget}= require('./budget_set');
const {transaction}= require('./transaction');


app.use(express.json());
app.use(urlencoded({extended:true}));
app.use(cookieParser());
app.use('/signup',signup);
app.use('/verify',verify);
app.use('/login',login);
app.use('/budget',budget);
app.use('/transaction',transaction)
app.use('/logout',logout);



app.get('/',authenticateToken,(req,res)=>{
    res.send(`welcome to the home page ${req.user}`);
})

app.listen(PORT,()=>{
    console.log("server is listening on 5050...");
    
});  