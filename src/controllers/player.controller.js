import { asyncHandler } from "../utils/asyncHandler.js";
import { Player } from "../models/player.model.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";

const generateAccessAndRefreshTokens = async (userId) => {  
    const user = await Player.findById(userId);
    if (!user) throw new ApiError(404, "Player not found");

    const accessToken = user.generateAccessToken();
    const refreshToken = user.generateRefreshToken();

    user.refreshToken = refreshToken;
    await user.save({ validateBeforeSave: false });

    return { accessToken, refreshToken };
};

const registerPlayer = asyncHandler(async (req, res, next) => {
    const { userName, email, password, jerseyNumber } = req.body;

    if (!userName || !email || !password || !jerseyNumber) {
        throw new ApiError(400, "All fields are required");
    }

    const existedUser = await Player.findOne({
        $or: [{ userName }, { email }]
    });

    if (existedUser) {
        throw new ApiError(409, "Player with email or username already exists");
    }

    const user = await Player.create({
        jerseyNumber,
        userName: userName.toLowerCase(),
        email,
        password
    });

    const createdUser = await Player.findById(user._id).select(
        "-password -refreshToken"
    );

    if (!createdUser) {
        throw new ApiError(500, "Something went wrong while registering the Player");
    }

    return res.status(201).json( // <-- Fixed status code to 201 (Created)
        new ApiResponse(201, createdUser, "Player registered Successfully")
    );
});

const loginPlayer = asyncHandler(async (req, res) => {
    const { email, userName, password } = req.body;

    if (!userName && !email) {
        throw new ApiError(400, "Username or email is required");
    }

    const user = await Player.findOne({
        $or: [{ userName }, { email }]
    });

    if (!user) {
        throw new ApiError(404, "Player does not exist");
    }

    // Fix: Call `isPasswordCorrect` on `user` object, not `Player` model
    const isPasswordValid = await user.isPasswordCorrect(password);
    if (!isPasswordValid) {
        throw new ApiError(401, "Invalid player credentials");
    }

    const { accessToken, refreshToken } = await generateAccessAndRefreshTokens(user._id);

    const player = await Player.findById(user._id).select("-password -refreshToken");

    const cookieOptions = {
        httpOnly: process.env.COOKIE_HTTP_ONLY === "true",
        secure: process.env.NODE_ENV === "production" && process.env.COOKIE_SECURE === "true",
        sameSite: process.env.COOKIE_SAME_SITE || "strict",
        maxAge: parseInt(process.env.COOKIE_MAX_AGE, 10) || 7 * 24 * 60 * 60 * 1000
    };

    return res
        .status(200)
        .cookie("accessToken", accessToken, cookieOptions)
        .cookie("refreshToken", refreshToken, cookieOptions)  // <-- Fixed refreshToken name
        .json(new ApiResponse(
            200,
            {
                player,
                accessToken,
                refreshToken
            },
            "Player logged in successfully"
        ));
});

export {
    registerPlayer,
    loginPlayer
};
