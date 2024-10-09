import { catchAsyncErrors } from "../middlewares/catchAsyncErrors.js";
import { Auction } from "../models/auctionSchema.js";
import { User } from "../models/userSchema.js";
import ErrorHandler from "../middlewares/error.js";
import {v2 as cloudinary} from "cloudinary"

export const addNewAuctionItem = catchAsyncErrors(async(req,res,next) => {
    if (!req.files || Object.keys(req.files).length === 0) {
        return next(new ErrorHandler("Auction Item Image Required", 400));
    }

    const { image } = req.files;
    const allowedFormats = ["image/png", "image/jpeg", "image/webp"];

    if (!allowedFormats.includes(image.mimetype)) {
        return next(new ErrorHandler("The image should be in png, jpeg or webp format only!", 400));
    }

    const {title, 
           description,
           category, 
           condition, 
           startingBid, 
           startTime, 
           endTime
        } = req.body

        if( !title || !description || !category || !condition || !startingBid || !startTime || !endTime){
            return next(new ErrorHandler("Please provide all the required details for the auction", 500))
        }

        if(new Date(startTime) < Date.now()){
            return next(new ErrorHandler("The start time of the auction must be after the current time", 400))
        }

        if(new Date(startTime) >= new Date(endTime)){
            return next(new ErrorHandler("The start time of the auction must be before the end time", 400))
        }

        //to check if user has already active auctions 
        const alreadyAuctionActive = await Auction.find({
            createdBy: req.user._id,
            endTime: { $gt: Date.now() }
        })

        if(alreadyAuctionActive.length > 0){
            return next(new ErrorHandler("You already have one active Auction, Please wait till it terminates."))
        }

        try {

            const cloudinaryResponse = await cloudinary.uploader.upload(image.tempFilePath, {
                folder: "MERN_AUCTION_PLATFORM_AUCTION",
            });
    
            if (!cloudinaryResponse || cloudinaryResponse.error) {
                console.error("Cloudinary Error: ", cloudinaryResponse.error || "Something went wrong with cloudinary");
                return next(new ErrorHandler("Failed to Upload auction item image, Please try again", 500));
            }
            
            const auctionItem = await Auction.create({
                title, 
                description,
                category, 
                condition, 
                startingBid, 
                startTime, 
                endTime,
                image: {
                    public_id: cloudinaryResponse?.public_id,
                    url: cloudinaryResponse?.secure_url
                },
                createdBy: req.user._id
            })
            return res.status(201).json({
                success: true,
                message: `Auction item created and will be listed at ${startTime}`,
                auctionItem: auctionItem
            })
        } catch (error) {   
            return next(new ErrorHandler(error.message || "Failed to create Auction! Try Again", 500))
        }
})