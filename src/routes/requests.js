const express = require("express");
const requestRouter = express.Router();
const User = require("../models/user");
const {userAuth} = require("../middlewares/auth");

requestRouter.post("/sendConnectionRequest",userAuth,  async(req, res) => {
    //Sending the connection request 
    const user = req.user;
    console.log("Sending the connection request")
    res.send(user. firstName +" sent the connection request!");
 })

module.exports = requestRouter;