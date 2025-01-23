import mongoose from "mongoose";
import jwt from 'jsonwebtoken';
import bcrypt from "bcryptjs"

const userSchema = new mongoose.Schema({
    UserName:{type:String,required:true},
    email:{type:String,required:true,unique:true},
    password:{type:String},
    isVerified:{type:Boolean,default:false},
    verificationCode: { type: String }, 
    verificationExpiry: { type: Date },
    refereshToken:{type:String}
}, {timestamps: true});

userSchema.pre("save",async function (next) {
    if(this.isModified("password")) return next();

    this.password=await bcrypt.hash(this.password,10)
    next()
})

userSchema.methods.isPasswordCorrect=async function (password) {
    return  await bcrypt.compare(password,this.password)
}

userSchema.methods.generateAccessToken=function(){
    return jwt.sign(
       { 
        _id:this._id,
        email:this.email,
        userName:this.userName,
       },
       process.env.ACCESS_TOKEN_SECRET,
       {
        expiresIn:process.env.ACCESS_TOKEN_EXPIRY
       }

    )
}

export const User = mongoose.model("User", userSchema)
