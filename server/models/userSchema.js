import mongoose from "mongoose"
import bcrypt from "bcrypt"
import jwt from "jsonwebtoken"

const userSchema = new mongoose.Schema({
    userName: {
        type: String,
        minLength: [3, "username must be of atleast 3 characters"],
        maxLength: [20, "username cannot contain more than 20 characters"],
    },
    password: {
        type: String,
        selected: false,
        minLength: [8, "password must be of atleast 8 characters"],
    },
    email : String,
    address : String,

    phone : {
        type: String,
        minLength : [10,  "Enter a valid Phone Number"],
        maxLength: [10, "Enter a valid phone Number"]
    },
    profileImage: {
        publicId : {
            type: String,
            required: true
        },
        url : {
            type: String,
            required: true
        }
    },
    paymentMethods: {
        bankTransfer : {
            bankAccountNumber: String,
            AccountHandlerName: String,
            ifscCode: String,
            bankName: String
        },
        upi: {
            upiId: String,
        },
    },
    role: {
        type: String,
        enum: ["Auctioneer", "Bidder", "Admin"]
    },
    unpaidCommision: {
        type: Number,
        default: 0,
    },
    auctionsWon: {
        type: Number,
        default: 0
    },
    moneySpent: {
        type: Number,
        default: 0
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
})

//just before userSchema is saved the async function should run
//logic - if the password is not a new password, not updated by the user then do nothing, but if user just got registered or changed the password then we apply bcrypt rounds to hash it.

userSchema.pre("save", async function (next) {
    if(!this.isModified("password")){
        next()
    }
    this.password = await bcrypt.hash(this.password, 10)
})

userSchema.methods.comparePassword = async function(enteredPassword){
    return await bcrypt.compare(enteredPassword, this.password)
}

userSchema.methods.generateJsonWebToken = function(){
 return jwt.sign({id: this._id}, process.env.JWT_SECRET_KEY, {
    expiresIn: process.env.JWT_EXPIRY
 })   
}
export const User = mongoose.model("User", userSchema)