import {catchAsyncErrors} from "../middlewares/catchAsyncErrors.js"
import ErrorHandler from "../middlewares/error.js"
import { Auction } from "../models/auctionSchema.js"
import { Bid } from "../models/bidSchema.js"


//place a bid for a specific item
export const placeBid = catchAsyncErrors(async(req,res,next) => {
    const {id} = req.params //id of the item
    const auctionItem = await Auction.findById(id)

    if(!auctionItem){
        return next(new ErrorHandler("Auction item does not exist", 404))
    }

    const amount = req.body

    if(!amount){
        return next(new ErrorHandler("Please place your bid", 404))
    }

    if(amount <= auctionItem.currentBid){
        return next(new ErrorHandler("Bid amount must be higher than the current bid", 400))
    }

    if(amount < auctionItem.startingBid){
        return next(new ErrorHandler("Bid amount must be higher than the starting bid", 400))
    }

    try {
        const existingBid = await Bid.findOne({
            "bidder.id": req.user._id,
            auctionItem: auctionItem._id
        })

        const existingBidInAuction = auctionItem.bids.find((bid) => bid.userId.toString() == req.user._id.toString())
        
        if(existingBid && existingBidInAuction){
            existingBidInAuction.amount = amount
            existingBid.amount = amount 
            await existingBidInAuction.save()
            await existingBid.save()
            auctionItem.currentBid = amount
        }else{
            const bidderDetail = await User.findById(req.user._id)
            const bid = await Bid.create({
                amount,
                bidder: {
                    id: bidderDetail._id,
                    userName: bidderDetail.userName,
                    profileImage: bidderDetail.profileImage?.url
                },
                auctionItem: auctionItem._id
            })
            auctionItem.bids.push({
                userId: req.user._id,
                userName: bidderDetail.userName,
                profileImage: bidderDetail.profileImage?.url,
                amount
            })
        }

        await auctionItem.save()

        res.status(201).json({
            success: true,
            message: "Bid Placed",
            currentBid: auctionItem.currentBid
        })
    } catch (error) {
        return next(new ErrorHandler(error.message || "Failed to place the bid", 500)) 
    }
})