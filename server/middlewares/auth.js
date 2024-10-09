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

    //this line verifies that the generated token in generated from the passed secret key only
    //this is done as user might login to multiple websites but to verify the token of our website we match it with the our website secret key

    //how decoded has access of id (decoded.id) -> when we defined generateJsonWebToken funnction in userSchema we returned the token as jwt.sign({ id: this._id }, ....) -> the payload id stores this._id which means id of the logged in user.

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