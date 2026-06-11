const express = require("express");
const User = require("../models/user");
const profileRouter = express.Router();
const {userAuth} = require("../middlewares/auth"); 
const { validateEditProfileData } = require("../utils/validations");
const bcrypt = require("bcrypt");


profileRouter.get("/profile/view"  , userAuth, async(req, res) => {
   try{

    const user = req.user;
    res.send(user); 
   }
   catch (err) {
        res.status(400).send("ERROR :" + err.message);
    }
})


profileRouter.put("/profile/edit",userAuth,async(req,res) => {
        try{
            if(!validateEditProfileData(req)){
                throw new Error("Invalid Edit Request");
            }
            const loggedInUser = req.user; 

            Object.keys(req.body).forEach((key) => (loggedInUser[key] = req.body[key]));

            await loggedInUser.save();

            res.json({ message:`${loggedInUser.firstName}, your profile updated successfully!!`, data:loggedInUser,})
            
           // res.send(`${loggedInUser.firstName}, your profile updated successfully!!`);
        }
        catch(err){
            res.status(400).send("ERROR:"+err.message);
        }
}) 

profileRouter.patch("/profile/changePassword",userAuth, async(req,res) => {
    try{
    const {password, newPassword, confirmNewPassword} = req.body;
    const loggedInUser = req.user;
    const isPasswordValid = await bcrypt.compare(
        password,
        loggedInUser.password
    )
    if(!isPasswordValid){
        throw new Error("Current password is incorrect");
    }
    if (newPassword !== confirmNewPassword) {
      throw new Error("Passwords do not match");
    }
    if (password === newPassword) {
      throw new Error(
        "New password cannot be the same as current password"
      );
    }
    const hashedPassword = await bcrypt.hash(newPassword, 10);

    loggedInUser.password = hashedPassword;

    await loggedInUser.save();
      res.json({
      message: "Password changed successfully",
    });
}
catch(err){
    res.status(400).send("ERROR:", err.message);
}
})

module.exports = profileRouter; 