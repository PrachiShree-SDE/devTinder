const express = require("express");
const app = express();

// this will only handle get call to /user
app.get("/user/:userId/:name/:password", (req, res) => {
    console.log(req.params);
    res.send({
        firstName: "Prachi",
        lastName: "shree"
    });
}); 


app.listen(7777, () => {
    console.log("Server is successfully listening at port number 7777...");
});
  