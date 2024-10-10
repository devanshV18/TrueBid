import {User} from "../models/userSchema.js"
import {catchAsyncErrors} from "../middlewares/catchAsyncErrors.js"
import ErrorHandler from "../middlewares/error.js"



//checks for any unpaid commissions of a auctionner before the auctioneer wants to post another auction or simply wants to post an auction
export const trackCommissionStatus = catchAsyncErrors( async(req,res,next) => {
    const user = await User.findById(req.user._id)
    if(user.unpaidCommision > 0){
        return next(new ErrorHandler("Please clear your unpaid commissions to post a new auction", 403))
    }
    next()
})