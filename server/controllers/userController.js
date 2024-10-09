import { catchAsyncErrors } from "../middlewares/catchAsyncErrors.js";
import ErrorHandler from "../middlewares/error.js";
import { User } from "../models/userSchema.js";
import { v2 as cloudinary } from "cloudinary";
import { generateToken } from "../utils/jwtToken.js";

export const register = catchAsyncErrors(async (req, res, next) => {
    
        if (!req.files || Object.keys(req.files).length === 0) {
            return next(new ErrorHandler("Profile Image Required", 400));
        }

        const { profileImage } = req.files;
        const allowedFormats = ["image/png", "image/jpeg", "image/webp"];

        if (!allowedFormats.includes(profileImage.mimetype)) {
            return next(new ErrorHandler("The image should be in png, jpeg or webp format only!", 400));
        }

        const { userName, email, password, phone, address, role, bankAccountNumber, AccountHandlerName, ifscCode, bankName, upiId } = req.body;

        if (!userName || !email || !phone || !password || !address || !role) {
            return next(new ErrorHandler("Please fill all necessary details", 400));
        }

        if (role === "Auctioneer") {
            if (!bankAccountNumber || !AccountHandlerName || !bankName) {
                return next(new ErrorHandler("Please provide necessary bank details", 400));
            }
            if (!upiId) {
                return next(new ErrorHandler("Please provide your UPI ID", 400));
            }
        }

        const userExists = await User.findOne({ email });

        if (userExists) {
            return next(new ErrorHandler("User Already Registered with this email", 400));
        }

        const cloudinaryResponse = await cloudinary.uploader.upload(profileImage.tempFilePath, {
            folder: "MERN_AUCTION_PLATFORM_USERS",
        });

        if (!cloudinaryResponse || cloudinaryResponse.error) {
            console.error("Cloudinary Error: ", cloudinaryResponse.error || "Something went wrong with cloudinary");
            return next(new ErrorHandler("Failed to Upload profile picture, Please try again", 500));
        }

        const user = await User.create({
            userName,
            email,
            password,
            phone,
            address,
            role,
            profileImage: {
                publicId: cloudinaryResponse.public_id,
                url: cloudinaryResponse.secure_url,
            },
            paymentMethods: {
                bankTransfer: {
                    bankAccountNumber,
                    AccountHandlerName,
                    ifscCode,
                },
                upi: {
                    upiId,
                },
            },
        });
        generateToken(user, "User Registered", 201, res)
});

export const login = catchAsyncErrors(async (req, res, next) => {
    const {email, password} = req.body;
    if(!email || !password){
        return next(new ErrorHandler("Please enter your email and password",400))
    }

    const user = await User.findOne({email}).select("+password")

    if(!user){
        return next(new ErrorHandler("Invalid Credentials or User is not registered.", 400))
    }

    const isPasswordMatched = await user.comparePassword(password)
    if(!isPasswordMatched){
        return next(new ErrorHandler("Invalid Password", 401))
    }

    generateToken(user, "Login Successfull", 200, res)

})

export const getProfile = catchAsyncErrors( async (req,res,next) => {
    const user = req.user
    res.status(200).json({
        success: true,
        user
    })
})

export const logout = catchAsyncErrors( async (req, res, next) => {
    res.status(200).cookie("token", "", {
        expires: new Date(Date.now()),
        httpOnly: true
    }).status(200).json({
        success: true,
        message: "Logged out Successfully!"
    })
})


//leaderboard of bidders based on all auctions
export const fetchLeaderBoard = catchAsyncErrors( async(req, res, next) => {
    const users = await User.find({moneySpent: { $gt: 0 }}) //all users who have spent money > 0
    const leaderboard = users.sort((a,b) => b.moneySpent - a.moneySpent) //adjacent spents are subtracted and add in a sorted(desc order) inside leaderboard in array format
    res.status(200).json({
        success: true,
        leaderboard
    })
})
