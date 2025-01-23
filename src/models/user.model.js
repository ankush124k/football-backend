import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    name:{type:String,required:true},
    email:{type:String,required:true,unique:true},
    hashedpassword:{type:String},
    isVerified:{type:Boolean,default:false},
    verificationCode: { type: String }, 
    verificationExpiry: { type: Date },
}, {timestamps: true});

export const User=mongoose.model('User',userSchema);