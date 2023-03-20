import mongoose from "mongoose";
import validator from "validator";
import bcrypt from "bcryptjs";
import jwt from 'jsonwebtoken';
import {  JWT_SECRET,JWT_EXPIRE } from "../config/index.js";
import crypto from "crypto";


const userSchema = new mongoose.Schema({
    name:{
        type:String,
        required:[true,"Please Enter Your Name"],
        maxLength:[30,"Name cannot exceed 30 characters"],
        minLength:[4,"Name should have more than 4 characters"]
    },
    email:{
        type:String,
        required:[true,"Please Enter Your Email"],
        unique:true,
        validate:[validator.isEmail,"Please enter a valid Email"]
    },
    password:{
        type:String,
        required:[true,"Please Enter Your password"],
        minLength:[8,"Password should have more than 8 characters"],
        select:false,
    },
    avatar:{
        
            public_id : {
                type:String,
                required: true
                },
                url : {
                    type:String,
                    required: true
                    }
           
    },
    role:{
        type:String,
        default:"user"
    },
    resetPasswordToken: String,
    resetPasswordExpire: Date,
})
//hashing password before saving
userSchema.pre("save", { document: true, query: false }, async function (next) 
{
    if(this.isModified("password")) {
        //Do the hash
        this.password = await bcrypt.hash(this.password,10)
     }
     next();
});
//JWT TOKEN
userSchema.methods.getJWTToken = function(){
    return jwt.sign({id:this._id},JWT_SECRET,{
        expiresIn:JWT_EXPIRE,
    })
}

////Compare password
userSchema.methods.comparePassword = async function(enteredPassword){
    return bcrypt.compare(enteredPassword,this.password)
}

//Generating Password Reset token 
//generate token


userSchema.methods.getResetPasswordToken = function(){
    const resetToken = crypto.randomBytes(20).toString("hex")
    //Hashing and adding resetPasswordToken to userSchema
    this.resetPasswordToken = crypto.createHash("sha256").update(resetToken).digest("hex")
    this.resetPasswordExpire = Date.now() + 15*60*1000;
    return resetToken;
}



export default mongoose.model("User",userSchema)