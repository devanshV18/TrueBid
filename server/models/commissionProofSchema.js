import mongoose from "mongoose"

const paymentProofSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    },
    proof: {
        public_id: {
            type: String,
            required: true
        },
        url: {
            type: String,
            required: true
        }
    },
    uplaodedAt: {
        type: Date,
        default: Date.now
    },
    status: {
        type: String,
        default: "Pending",
        enum: ["Pending", "Approved", "Rejected", "Settled"]
    },
    amount : {
        type: Number,
        comment: String
    }
})

export const PaymentProof = mongoose.model("Payment", paymentProofSchema)