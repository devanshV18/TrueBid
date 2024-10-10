import { catchAsyncErrors } from "../middlewares/catchAsyncErrors.js";
import { Auction } from "../models/auctionSchema.js";
import { User } from "../models/userSchema.js";
import ErrorHandler from "../middlewares/error.js";
import {v2 as cloudinary} from "cloudinary"
import mongoose from "mongoose";

//adding an auction item function for auctioneer users
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

//getting all auction Items to list on the web site
export const getAllItems = catchAsyncErrors( async(req,res,next) => {
    let items = await Auction.find() // all docs under Auction Model
    res.status(200).json({
        success: true,
        items
    })
})


//fetching auction details of a certain auctions using its id, we also get a sorted array of bidders in desc order.
export const getAuctionDetails = catchAsyncErrors( async(req,res,next) => {

    const {id} = req.params

    if(!mongoose.Types.ObjectId.isValid(id)){
        return next(new ErrorHandler("Invalid Id Format", 400))
    }
    const auctionItem = await Auction.findById(id)
    if(!auctionItem){
        return next(new ErrorHandler("Auction item requested does not exist.", 404))
    }

    const bidders = auctionItem.bids.sort((a,b) => b.bid - a.bid)
    res.status(200).json({
        success: true,
        auctionItem,
        bidders
    })
})


//fetching auctions posted by a particular user who is an auctioneer -> req.user._id comes from the middle ware isAuthenticated 
export const getMyAuctionItems = catchAsyncErrors( async(req,res,next) => {
    const userAuctionItems = await Auction.find({createdBy: req.user._id})
    res.status(200).json({
        success: true,
        userAuctionItems
    })
})


// delete a given auction item using its id
export const removeFromAuctions = catchAsyncErrors( async(req,res,next) => {
    const {id} = req.params

    if(!mongoose.Types.ObjectId.isValid(id)){
        return next(new ErrorHandler("Invalid Id Format", 400))
    }
    const auctionItem = await Auction.findById(id)
    if(!auctionItem){
        return next(new ErrorHandler("Auction item requested does not exist.", 404))
    }

    await auctionItem.deleteOne()
    res.status(200).json({
        success: true,
        message: "Auction item deleted successfully"
    })
})


//Republishing an existing auction item using its id
export const republishItem = catchAsyncErrors( async(req,res,next) => {
    const {id} = req.params

    if(!mongoose.Types.ObjectId.isValid(id)){
        return next(new ErrorHandler("Invalid Id Format", 400))
    }
    let auctionItem = await Auction.findById(id)
    if(!auctionItem){
        return next(new ErrorHandler("Auction item requested does not exist.", 404))
    }
    if(new Date(auctionItem.endTime) > Date.now()){
        return next(new ErrorHandler("Auction is already active, cannot Republish", 400))
    }
    let data = {
        startTime: new Date(req.body.startTime),
        endTime: new Date(req.body.endTime)
    }
    if(data.startTime < Date.now()){
        return next(new ErrorHandler("Auction startTime must be after the current time", 400))
    }

    if(data.startTime >= data.endTime){
        return next(new ErrorHandler("Auction startTime must be before the end time", 400))
    }
    data.bids = []
    data.commissionCalculated = false

    if( !req.body.startTime || !req.body.endTime){
        return next(new ErrorHandler("Start and End time is amndatory for republishing an item", 400))
    }

    auctionItem = await Auction.findByIdAndUpdate(id, data, {
        new: true,
        runValidators: true,
        useFindAndModify: false
    })

    const createdBy = await User.findByIdAndUpdate(req.user._id, {unpaidCommision: 0}, {
        new: true,
        runValidators: false,
        useFindAndModify: false
    })

    res.status(200).json({
        success: "true",
        auctionItem,
        message: `Auction republished successfuly and start at ${req.body.startTime}`,
        createdBy
    })
})