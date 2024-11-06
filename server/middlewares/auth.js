import {User} from "../models/userSchema.js"
import jwt from "jsonwebtoken"
import ErrorHandler from "./error.js"
import { catchAsyncErrors } from "./catchAsyncErrors.js"

export const isAuthenticated = catchAsyncErrors(async(req,res,next) => {

    //get the token of the logged in user from cookies
    const token = req.cookies.token

    //if token not found - user is not logged in so we return an error
    if(!token){
        return next(new ErrorHandler("User Not Authenticated", 400))
    } 
    
    //vvvii explanation


    //the below line verifies the token is generated froim our key only, and also decodes the sent token to retrieve the information passed in it while wr created this token usign jwt.sign method (in our case we sent a paylaod id: this._id) which means id contained the the id of the user for which token was generated, so we get the access of the id of the user to which the token belongs to and thus we set req.user  = user of the id decoded carries.
    const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY)
    

    req.user = await User.findById(decoded.id)
    next()
})

export const isAuthorized = (...roles) => {
    return(req,res,next) => {
        if(!roles.includes(req.user.role)){
            return next(new ErrorHandler(`${req.user.role} not allowed to access this resource.`, 403))
        }
        next()
    }
}