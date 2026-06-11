const express = require("express");
const { validateSignUpDate } = require("../utils/validations");
const authRouter = express.Router();
const User = require("../models/user");
const bcrypt = require("bcrypt"); 
const jwt = require("jsonwebtoken");
const validator = require("validator")



authRouter.post("/signup", async (req, res) => {
  try { 
 // Validation of data
 validateSignUpDate(req);
 
 const {firstName,lastName,emailId,password} = req.body; 
 
 // Encrypting the password
 
 const passswordHash = await bcrypt.hash(password,10);  
 console.log(passswordHash);
 
  //Creating new instance of user model  
     const user = new User({ 
         firstName,
         lastName,
         emailId,
         password: passswordHash,
     }
     );
      const savedUser = await user.save();
      const token = await savedUser.getJWT();

     res.cookie("token",token, {
        expires: new Date(Date.now() + 8*3600000),
     })

         res.json({message:"User Added successfully!", data:savedUser});
     } catch (err) {
         res.status(400).send("ERROR :" + err.message);
     }
 });

authRouter.post("/login", async(req,res) => {
    try{
 const {emailId, password} = req.body;
    
    const user = await User.findOne({emailId:emailId});
    if(!validator.isEmail(emailId)){
           throw new Error("Email is not valid");
        }
    if(!user){
        throw new Error("Invalid credentials");
    }
      const isPasswordValid =await user.validatePassword(password)
    if(isPasswordValid){
        //Create a JWT Token

        const token = await user.getJWT(); 
         
        res.cookie("token",token,{
            expires: new Date(Date.now()+8*3600000), 
        });  

        res.send(user);  
    } 
    else{
        throw new Error("Invalid credentials");
    } 

    }
    catch (err) {
        res.status(400).send("ERROR :" + err.message);
    }
})

authRouter.post("/logout", async(req,res)=> {
     res.cookie("token",null, {
        expires: new Date(Date.now()),
     })
     res.send("Successfully Logout!!");
 })



module.exports = authRouter;