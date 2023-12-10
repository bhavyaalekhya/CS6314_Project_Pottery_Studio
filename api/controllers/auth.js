// import { db } from "../db.js";
const User =require("../models/user.js");
const bcrypt =require("bcrypt");

 const register = (req, res) => {
    const { username, email, phone, address, password } = req.body;
 User.findOne({ username: username }).then((user)=>{
    if (user) {
        return res.status(200).json({data:false});
       } else {
        bcrypt.hash(req.body.password, 10, function(err, hash) {
            User.create({
               username: req.body.username,
               email: req.body.email,
               password: hash,
               phone: req.body.phone,
               address: req.body.address,
               role: "customer"
            }).then((data)=>{
                return res.status(200).json({data:true});

            }).catch((err)=>{
               console.log(err);
            })
        }); 
       }
 }).catch((err)=>{
    console.log(err);
 });   
   }

 const login = (req, res) => {
   const { username, email, phone, address, password, role } = req.body;
    //console.log(req.body);
    User.findOne({ username: username }).then((user)=>{
      if (!user || user==null) {
         return res.status(200).json({data:false});
      }
         user.comparePassword(password, function(err, isMatch) {
            if (err) {
               return res.status(404).json({data:true}); 
            }
            if (!isMatch) {
            return res.status(200).json({data:user});
            }
            else{
            return res.status(200).json({data:user});

            }
         });
      }).catch((err)=>{
      console.log(err);
      //  return done(err); 
      
     });
}


 const logout = (req, res) => {
   res.redirect("/dashboard")
    
}


module.exports = {
    logout,login,register
};