const mongoose = require("mongoose");

const connectDB = async () => {
     await mongoose.connect("mongodb+srv://prachishree111:Prachi11115@test1.4obii34.mongodb.net/devTinder");
};

module.exports=connectDB;

