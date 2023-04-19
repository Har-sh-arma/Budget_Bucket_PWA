const { user_exists } = require("./login_functions");


async function get_profile(req,res){
    try{
        const user = await user_exists(req.user);
        if(user.exists){
            console.log(user);
            res.json({"name":user.details.name, "email":user.details.email, "DOB":user.details.DOB, "location": user.details.location, "profile": user.details.profile});
        }

    }catch(err){
        res.status(500).send("server side err");
    }
} 

module.exports= {get_profile};