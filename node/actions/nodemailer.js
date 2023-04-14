const nodemailer= require('nodemailer');

function send_mail(email,otp){
return new Promise((resolve,reject)=>{
  let user_name = process.env.SENDER_MAIL;
  let user_pass= process.env.SENDER_PASS;

  const transporter = nodemailer.createTransport({
      port: 465,               // true for 465, false for other ports
      host: "smtp.gmail.com",
         auth: {
              user: user_name,
              pass: user_pass,
           },
      secure: true,
      });

      const mailData = {

            from: user_name,  // sender address
            to: email,   // list of receivers
            subject: 'OTP For signup in BUDGET_BUCKET',
            text: `OTP : ${otp}`,
           
          };
         
          transporter.sendMail(mailData, function (err, info) {
              if(err){console.log(err); reject(err); }
              console.log(info);
              resolve(true); 
           }); 
})
    
}

module.exports= {send_mail};