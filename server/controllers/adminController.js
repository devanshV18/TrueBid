import { catchAsyncErrors } from "../middlewares/catchAsyncErrors.js";
import ErrorHandler from "../middlewares/error.js";
import { User } from "../models/userSchema.js";
import { commission } from "../models/commissionSchema.js";
import mongoose from "mongoose"
import { Auction } from "../models/auctionSchema.js";
import { PaymentProof } from "../models/commissionProofSchema.js";



//delete function for admin to delete any auction which is unauthorise(Although edge cases have been handled but its a good practice)
export const deleteAuctionItem = catchAsyncErrors( async(req,res,next) => {
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


//fetch all payment proofs so that admin can access them and review them
export const getPaymentProofs = catchAsyncErrors(async(req,res,next) => {
    let paymentProofs = await PaymentProof.find()
    res.status(200).json({
        success: true,
        paymentProofs
    })
})


//fetch payment Proof Details by the payment proof document id to be reviewd by the admin
export const paymentProofDetails = catchAsyncErrors(async(req,res,next) => {
    const {id} = req.params
    const paymentProofDetail = await PaymentProof.findById(id)
    res.status(200).json({
        success: true,
        paymentProofDetail
    })
})


//update function for the payment whose details are fetched
export const updateProofStatus = catchAsyncErrors(async(req,res,next) => {
    const {id} = req.params
    const {amount,status} = req.body
    if(!mongoose.Types.ObjectId.isValid(id)){
        return next(new ErrorHandler("Invalid Id Format",400))
    }
    let proof = await PaymentProof.findById(id)
    if(!proof){
        return next(new ErrorHandler("Payment proof not found!", 404))
    }
    proof = await PaymentProof.findByIdAndUpdate(id, {status, amount}, {
        new: true,
        runValidators: true, 
        useFindAndModify: false
    })
    res.status(200).json({
        success: true,
        message: "Payment proof amount and status updated",
        proof
    })
})


//deletin a payment proof
export const deletePaymentProof = catchAsyncErrors(async(req,res,next) => {
    const {id} = req.params
    const proof = await PaymentProof.findById(id)

    if(!proof){
        return next(new ErrorHandler("Payment Proof Not Found", 404))
    }

    await proof.deleteOne()

    res.json({
        success: true,
        message: "Payment proof deleted"
    })
})