const express = require("express");
const connectDB =  require("./config/database")
const app = express();
const User = require("./models/user");

app.post("/signup",async  (req, res) => {  
    //Creating new instance of user model 
    const user= new User({
        firstName: "Viraat",
        lastName:"Kohli",
        emailId:"Viraat@email.com",
        password:"Viraat@123"
    });
    try{
         await user.save();
    res.send("User Added successfully!");  
    }catch(err){
         res.status(400).send("Error saving the user:"+err.message); 
    }   
})      

connectDB().then(()=>{
    console.log("Database connection established...");
    app.listen(7777, () => {
    console.log("Server is successfully listening at port number 7777...");
}); 
}).catch(err => {
    console.error("Database cannot be connected!!!");
})   

       