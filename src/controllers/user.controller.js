import {asyncHandler} from "../utils/asyncHandler.js"; 
import { User } from "../models/user.model.js";
import {ApiError} from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";

const generateAccessAndRefreshTokens = async (userId) => {  
    const user = await User.findById(userId);
    if (!user) throw new ApiError(404, "User not found");

    const accessToken = user.generateAccessToken();
    const refreshToken = user.generateRefreshToken();

    user.refreshToken = refreshToken;
    await user.save({ validateBeforeSave: false });

    return { accessToken, refreshToken };
};

const registerUser=asyncHandler(async (req,res,next) => {
    const {userName,email,password,fullName}=req.body;

    if(!userName||!email||!password||!fullName) throw new ApiError(400,"All fields are required");

    const existedUser = await User.findOne({
        $or:[{userName},{email}]
    })

    if(existedUser){
        throw new ApiError(409,"User with email or username already exists")
    }

    const user = await User.create({
        fullName,
        userName:userName.toLowerCase(),
        email,
        password
    });

    const createdUser = await User.findById(user._id).select(
        "-password -refreshToken"
    ) 

    if (!createdUser) {
        throw new ApiError(500, "Something went wrong while registering the user")
    }

    return res.status(201).json(
        new ApiResponse(200, createdUser, "User registered Successfully")
    ) 
})

const loginUser=asyncHandler(async (req,res) => {
    const {email, userName, password} = req.body

    if (!userName || !email) {
        throw new ApiError(400, "username or email is required")
    }

    const user = await User.findOne({
        $or: [{userName}, {email}]
    })

    if (!user) {
        throw new ApiError(404, "User does not exist")
    }

   const isPasswordValid = await user.isPasswordCorrect(password)
   console.log("isPasswordValid",isPasswordValid);
   if (!isPasswordValid) {
    throw new ApiError(401, "Invalid user credentials")
    }

   const { accessToken,refreshToken} = await generateAccessAndRefreshTokens(user._id)
   
   
   const loggedInUser = await User.findById(user._id).select("-password -refreshToken")
   const cookieOptions = {
        httpOnly: process.env.COOKIE_HTTP_ONLY === "true", 
        secure: process.env.NODE_ENV === "production" && process.env.COOKIE_SECURE === "true", 
        sameSite: process.env.COOKIE_SAME_SITE || "strict", 
        maxAge: parseInt(process.env.COOKIE_MAX_AGE, 10) || 7 * 24 * 60 * 60 * 1000 
    };

    return res
    .status(200)
    .cookie("accessToken",accessToken,cookieOptions)
    .cookie("refreshtoken",refreshToken,cookieOptions)
    .json(new ApiResponse(
        200,
        {
            user:loggedInUser,
            accessToken,
            refreshToken
        },
        "user logged in successfully"
    ))
})

export {
    registerUser,
    loginUser
}