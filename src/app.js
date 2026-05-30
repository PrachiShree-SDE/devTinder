const express = require("express");
const connectDB = require("./config/database")
const app = express();  
const User = require("./models/user");
const { validateSignUpDate } = require("./utils/validations");
const bcrypt = require("bcrypt"); 
const validator = require("validator");


app.use(express.json());


app.post("/signup", async (req, res) => {
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
   
        await user.save();
        res.send("User Added successfully!");
    } catch (err) {
        res.status(400).send("ERROR :" + err.message);
    }
});


app.post("/login", async(req,res) => {
    try{
 const {emailId, password} = req.body;
    
    const user = await User.findOne({emailId:emailId});
    if(!validator.isEmail(emailId)){
           throw new Error("Email is not valid");
        }
    if(!user){
        throw new Error("Invalid credentials");
    }
      const isPasswordValid =await bcrypt.compare(password,user.password)
    if(isPasswordValid){
        res.send("Login successful!!!")
    } 
    else{
        throw new Error("Invalid credentials");
    } 

    }
    catch (err) {
        res.status(400).send("ERROR :" + err.message);
    }
})
 
//Get user by email
app.get("/user", async (req, res) => {
    const userEmail = req.body.emailId;
    //const userId = req.body._id; 
    try {

        // const user = await User.find({_id:userId})
        // if(!user){
        //      res.status(404).send("User not found!");
        // }else{
        //      res.send(user);
        // }


        // const user = await User.findOne({ emailId: userEmail });
        // if(!user){
        //     res.status(404).send("User not found!");
        // }else{
        //      res.send(user);  
        // }


        const user = await User.find({
        emailId: userEmail
         })
         if(user.length === 0){
            res.status(404).send("User not found");
         }
         else{
             res.send(user); 
         }
              
           
    } catch (err) {
        res.status(400).send("Something went wrong!!");
    }

})

//Feed API-GET /feed -get all the  users from database
app.get("/feed", async (req, res) => {
    try {
        const users = await User.find({})
        res.send(users)
    } catch (err) {
        res.status(400).send("Something went wrong!!");
    }
})

// Delete data from the database
app.delete("/user",async(req,res) => {
    const userId = req.body.userId;
    try{
        //const  user = await User.findByIDAndDelete({_id:userId});
        const user = await User.findByIdAndDelete(userId)
        res.send("User deleted successfully!");

    } catch (err) {
        res.status(400).send("Something went wrong!!");
    }
})

//Update User
app.patch("/user/:userId",async(req, res) => {
   const userId = req.params?.userId;
   //const userEmail = req.body.emailId; 
   const data = req.body; 
   
   try{

    const ALLOWED_UPDATE = [
    "photoUrl", "about", "gender", "age", "skills"
   ]
   const isUpdateAllowed = Object.keys(data).every((k) => ALLOWED_UPDATE.includes(k))
   if(!isUpdateAllowed){
    throw new Error("Update not allowed");
   }
   if(data?.skills.length >10){
    throw new Error("Skills cannot be more than 10")
   }

    // const user = await User.findOneAndUpdate({emailId:userEmail},data,{
    // returnDocument:"after",
    // runValidators: true
    // })

    const user = await User.findByIdAndUpdate({_id:userId},data , {returnDocument:"after",runValidators: true});

    console.log(user);
    res.send("User Updated successfully")
   }catch(err){
     res.status(400).send("UUDATE FAILED!"+err.message);
   }   
})  


connectDB().then(async() => {
    console.log("Database connection established...");
    try{
        await User.syncIndexes();
        console.log("Database indexes synchronized successfully.")
    }catch(indexErr){
        console.error("Failed to build unique index. Check for existing duplicate");
    }
    app.listen(7777, () => {
        console.log("Server is successfully listening at port number 7777...");
    });
}).catch(err => {
    console.error("Database cannot be connected!!!");
})
 

