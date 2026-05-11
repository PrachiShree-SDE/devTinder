const express = require("express");
const app = express();

//app.use("/route", rH, [rH2, rH3],rH4,rH5); // rH-routeHandler

app.use("/user", 
    (req,res, next) => {
    console.log("Handling route user!!");
    //res.send("Response!!"); // after sending one res it will not move ahaid
    next(); 
},
(req,res ) => {
    console.log("Handling route user2!!");
    res.send("2nd Response!!");
   
}
)

app.listen(7777, () => {
    console.log("Server is successfully listening at port number 7777...");
});
  