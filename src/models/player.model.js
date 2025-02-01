import mongoose from "mongoose";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs"

const PlayerSchema= new mongoose.Schema({
    playerName:{type:String,required:false},
    jerseyNumber:{type:Number,required:true},
    userName:{type:String,required:true},
    currentTeam:{type:String,required:false},
    playerStatistics:{type:String,required:false},
    email:{type:String,required:true,unique:true},
    password:{type:String},
    isVerified:{type:Boolean,default:false},
    verificationCode: { type: String }, 
    verificationExpiry: { type: Date },
    refreshToken:{type:String}
},{timestamps:true})


PlayerSchema.pre("save",async function (next) {
    if(!this.isModified("password")) return next();
    
    this.password= await bcrypt.hash(this.password,10)
    next()
})

PlayerSchema.methods.isPasswordCorrect=async function (password) {
    return  await bcrypt.compare(password,this.password)
}

PlayerSchema.methods.generateAccessToken=function(){
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

PlayerSchema.methods.generateRefreshToken = function(){
    return jwt.sign(
        {
            _id: this._id,
            
        },
        process.env.REFRESH_TOKEN_SECRET,
        {
            expiresIn: process.env.REFRESH_TOKEN_EXPIRY
        }
    )
}

export const Player = mongoose.model("Player", PlayerSchema) 