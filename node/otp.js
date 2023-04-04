const generateOTP = ()=>{
    let otp = Math.ceil(Math.random()*10000);
    if(otp<1000){otp+=1000;}
    console.log(otp);
    let otp_string=otp.toString()
    return otp_string;
}



module.exports={generateOTP};