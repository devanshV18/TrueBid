import mongoose from 'mongoose'


//Schema for approved payments
const commissionSchema = new mongoose.Schema({
    amount: Number,
    user: mongoose.Schema.Types.ObjectId,
    createdAt: {
        type: Date,
        default: Date.now
    }
})

export const commission = mongoose.model("Commission", commissionSchema)