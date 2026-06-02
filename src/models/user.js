const mongoose = require("mongoose");
const validator = require("validator");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

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
        default:"https://img.magnific.com/premium-vector/young-man-avatar-character-due-avatar-man-vector-icon-cartoon-illustration_1186924-4438.jpg?semt=ais_hybrid&w=740&q=80",
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


userSchema.methods.getJWT = async function () {
    const user = this;
    const token = await jwt.sign({_id: user._id},"DEV@Tinder$790",{
        expiresIn: "7d",
    })
    return token;
}


userSchema.methods.validatePassword = async function (passwordInputByUser) {
    const user = this;
    const passwordHash = user.password;

    const isPasswordValid = await  bcrypt.compare(passwordInputByUser,passwordHash);

    return isPasswordValid;   
}

// const User = mongoose.model("User",userSchema);
// module.exports = User;

module.exports = mongoose.model("User", userSchema); 