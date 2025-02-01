import {Router} from 'express'
import { 
    loginUser, 
    // logoutUser, 
    registerUser, 
    // refreshAccessToken, 
    // changeCurrentPassword, 
    // getCurrentUser, 
    // updateUserAvatar, 
    // updateUserCoverImage, 
    // getUserChannelProfile, 
    // getWatchHistory, 
    // updateAccountDetails
} from "../controllers/user.controller.js";
//controllers
import {verifyJWT} from "../middlewares/auth.middleware.js"
const router=Router()

// all are secured routes
router.route('/register').post(registerUser);
router.route('/loginUser').post(verifyJWT,loginUser);


export default router;