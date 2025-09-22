import asyncHandler from "../utils/asyncHandler.js"
import { apiError } from "../utils/apiError.js"
import { User } from "../models/user.moddels.js"
import { uploadOnCloudinary } from "../utils/cloudinary.js"
import { apiResponse } from "../utils/apiResponse.js"

const registerUser = asyncHandler(async (req, res) => {
    // get user details from frontend
    // validaton of user details - not empty, email format, password strength
    // check if user already exists: username, email
    // check for images, check for avatar
    // upload them to cloudinary, avatar
    // create user object - create entry in db
    // remove password and refresh token from response
    // check for user creation
    // return response 

    const {fullName, email, username, password} = req.body 
    //console.log("email", email)

    // if(fullName === ""){
    //     throw new apiError("Full name is required", 400)
    // }
    if(
        [fullName, email, username, password].some((field) => field?.trim() === "")
    ){
        throw new apiError(400, "All fields are required")
    }

    const existedeUser = await User.findOne({
        $or: [{username}, {email}]
    })
    if(existedeUser){
        throw new apiError(409, "User already exists")
    }
    // handle images
    const avatarLocalPath = req.files?.avatar[0]?.path;
    //const coverImageLocalPath = req.files?.coverImage[0]?.path;

    let coverImageLocalPath;
    if (req.files && Array.isArray(req.files.coverImage) && req.files.coverImage.length > 0) {
        coverImageLocalPath = req.files.coverImage[0].path
    }

    if(!avatarLocalPath){
        throw new apiError(400, "Avatar is required")
    }
    // upload to cloudinary
    const avatar = await uploadOnCloudinary(avatarLocalPath)
    const coverImage = await uploadOnCloudinary(coverImageLocalPath)

    if(!avatar){
        throw new apiError(500, "Error while uploading avatar")
    }

    const user = await User.create({
        fullName,
        avatar: avatar.url,
        coverImage: coverImage?.url || "",
        email,
        username: username.toLowerCase(),
        password, 
    })

    const createdUser = await User.findById(user._id).select("-password -refreshToken")

    if(!createdUser){
        throw new apiError(500, "Error while registering user")
    }

    return res.status(201).json(
        new apiResponse(200, createdUser, "User registered successfully")
    )
})

export default{
    registerUser,
} 

