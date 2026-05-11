const express = require("express");
const app = express();
const {adminAuth,userAuth} = require("./middlewares/auth");


//Handle auth middleware for all GET, POST, ....request
app.use("/admin",adminAuth);
//app.use("/user",userAuth);
//  app.use("/user",userAuth,(req,res)=>{
//     res.send("User Data Sent");
//  });

app.use("/user/login",userAuth,(req,res)=>{
    res.send("User Logged in successfully");
 });

 app.use("/user/data",userAuth,(req,res)=>{
    res.send("User Data Sent");
 })

// Get /user => midlleware chain => request handler 
app.get("/admin/getAllData", (req,res) => {
     //Logic of Check if the request is authorized
        res.send("All Data Sent");
});

app.get("/admin/deleteUser", (req,res) => {
     res.send("Deleted a user");
});

app.listen(7777, () => {
    console.log("Server is successfully listening at port number 7777...");
});
  