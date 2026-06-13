const express = require("express");
const connectDB = require("./config/database")
const app = express();   
const cookieParser = require("cookie-parser");
const cors = require("cors");
const User = require("./models/user");

app.use(express.json());
app.use(cookieParser());

app.use(cors({
    //origin: "http://localhost:5173",
     origin: true,
    credentials: true, 
}));





const authRouter = require("./routes/auth");
const profileRouter = require("./routes/profile");
const requestRouter = require("./routes/requests");
const userRouter = require("./routes/user");


app.use("/",authRouter); 
app.use("/",profileRouter); 
app.use("/",requestRouter); 
app.use("/",userRouter);

connectDB().then(async() => {
    console.log("Database connection established...");
    try{
        await User.syncIndexes();
        console.log("Database indexes synchronized successfully.")
    }catch(indexErr){
        console.error("Failed to build unique index. Check for existing duplicate");
    }
    app.listen(7777,"0.0.0.0", () => {
        console.log("Server is successfully listening at port number 7777...");
    });
    
}).catch(err => {
    console.error("Database cannot be connected!!!");
})
 

