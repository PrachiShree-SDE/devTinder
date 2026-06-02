const express = require("express");
const connectDB = require("./config/database")
const app = express();   
const cookieParser = require("cookie-parser");

app.use(express.json());
app.use(cookieParser());

const authRouter = require("./routes/auth");
const profileRouter = require("./routes/profile");
const requestRouter = require("./routes/requests");


app.use("/",authRouter); 
app.use("/",profileRouter); 
app.use("/",requestRouter); 

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
 

