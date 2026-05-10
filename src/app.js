const express = require("express");
const app = express();

app.use("/",(req, res) => {
    res.send("Hello from the dashboard");
});

app.use("/hello",(req, res) => {
    res.send("Hello Hello Hello");
});

app.use("/test",(req, res) => {
    res.send("Hello from the server!!!");
});

app.listen(7777, () => {
    console.log("Server is successfully listening at port number 7777...");
});
 