const mongoose = require("mongoose");
const validator = require("validator");

const userSchema = new mongoose.Schema({
    firstName: {
        type: String,
        required: true,
        minLength:4,
        maxLength:15, 
    },
    lastName: {
        type: String
    },
    emailId: {
        type: String,
        required: true,
        unique:true,
        lowercase:true,
        trim:true,
        validate(value){
            if(!validator.isEmail(value)){
                throw new Error("Invalid Email Address!"+value); 
            }
        }
    },
    password: {
        type: String,
        required: true,
         validate(value){
            if(!validator.isStrongPassword(value)){
                throw new Error("Enter a Strong Password!"+value); 
            }
        }   
    },
    age: {
        type: Number,
        min:18, 
    },
    gender: {
        type: String,
        validate(value){
            if(!["male","femail","other"].includes(value)){
                throw new Error("Gender data is not valid");
            }
        }
    },
    photoUrl:{
        type:String,
        default:"https://avatars.githubusercontent.com/u/1484030?v=4 ",
          validate(value){
            if(!validator.isURL(value)){
                throw new Error("Invalid photo url!"+value); 
            }
        }
    },
    about:{
      type:String, 
      default:"This is the default about of the User!"
    },
    skills:{
        type:[String]
    }
},
{
   timestamps:true,   
});

// const User = mongoose.model("User",userSchema);
// module.exports = User;

module.exports = mongoose.model("User", userSchema);